import mysql, { Pool, PoolOptions, ResultSetHeader } from 'mysql2/promise';

import { Config } from '../models/config.model';

class DatabaseService {
  private sqlConfig!: PoolOptions;
  private databasePool!: Pool;

  constructor() { }

  async init(configVars: Config): Promise<void> {
    this.sqlConfig = {
      user: configVars.DB_USER,
      password: configVars.DB_PASS,
      database: configVars.DB_NAME,
      host: configVars.DB_HOST,
      connectionLimit: 50,
    };

    this.databasePool = mysql.createPool(this.sqlConfig);

    try {
      const connection = await this.databasePool.getConnection();
      console.log('Database connected');
      connection.release();
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  getHealthStatus(): { is_healthy: boolean; is_connected: boolean } {
    return {
      is_healthy: true, // Assuming that if you can create a pool, it's healthy
      is_connected: this.databasePool !== undefined,
    };
  }

  async login(email: string, password: string, type: string): Promise<any> {
    const [result]: any = await this.databasePool.query(
      'SELECT id,email,type FROM User WHERE email = ? AND password = ? AND type =?',
      [email, password, type]
    );

    return result;

  }

  async fetchClasses(studentID: string): Promise<any> {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const [rows] = await this.databasePool.query(`
    SELECT c.*, s_latest.id as session_id, IFNULL(s_latest.isactive, 0) as isActive
    FROM Course c
    INNER JOIN Enrollment e ON c.id = e.course_id
    LEFT JOIN Session  s_latest ON s_latest.id = (
      SELECT MAX(s.id)
      FROM Session s
      WHERE s.course_id = c.id
  )
    WHERE e.student_id = ? AND c.session_day = ?
    
    `, [studentID, dayOfWeek]);
    return rows;
  }

  async fetchClass(session_id: string): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT s.*, c.name AS course_name, c.id, GROUP_CONCAT(u.name) AS tutor_names
      FROM Session s
      INNER JOIN Course c ON s.course_id = c.id
      INNER JOIN Tutor_Course tc ON tc.course_id = c.id
      INNER JOIN User u ON tc.tutor_id = u.id
      WHERE s.id=?
      GROUP BY s.id, c.id`,
      [session_id]
    );
    return result;
  }
  async insertStudent(name: string, age: number): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Students (name, age) VALUES (?, ?)',
      [name, age]
    );

    return result.insertId; // Returns the ID of the inserted record
  }

  async updateStudent(id: number, name: string, age: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'UPDATE Students SET name = ?, age = ? WHERE id = ?',
      [name, age, id]
    );

    return result.affectedRows > 0; // Returns true if at least one row was updated
  }

  async deleteStudent(id: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'DELETE FROM Students WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0; // Returns true if at least one row was deleted
  }

  async insertUser(name: string, email: string, password: string, type: string): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO User (name, email, password, type) VALUES (?, ?, ?, ?)',
      [name, email, password, type]
    );
    return result.insertId;
  }

  async fetchCourses(): Promise<any> {
    const [rows] = await this.databasePool.query('SELECT * FROM Course');
    return rows;
  }


  async getAttendance(studentID: string, sessionID: string): Promise<any> {
    const [rows] = await this.databasePool.query(`
    SELECT s.*, c.name AS course_name, IFNULL(a.id, 0) as MarkStatus
    FROM Session s
    INNER JOIN Course c ON s.course_id = c.id
    INNER JOIN Enrollment e ON e.course_id = c.id
    INNER JOIN User u ON e.student_id = u.id
    left join Attendance a On a.session_id= s.id and u.id =a.student_id
    where u.id =? and s.id=?`,
      [studentID, sessionID]);
    return rows;
  }

  async markAttendance(studentID: number, sessionID: number): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Attendance (student_id, session_id) VALUES (?, ?)',
      [studentID, sessionID]
    );
    return result.insertId;
  }
  async insertStudentEnrolments(userID: number, CourseID: number): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Enrollment (student_id, course_id) VALUES (?, ?)',
      [userID, CourseID]
    );
    return result.insertId;
  }

  async fetchStudentEnrolments(userID: number): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT c.*, (e.student_id IS NOT NULL) AS enrol
      FROM Course c
      LEFT JOIN Enrollment e
      ON c.id = e.course_id AND e.student_id = ?;`,
      [userID]
    );
    return result;
  }

  async fetchclassstats(userID: number): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT FROM 
       Course c
       INNER JOIN 
       Enrollment e
       ON c.id = e.course_id 
       INNER JOIN 
       Session s
       on s. ?`,
      [userID]
    );
    return result;
  }



  async timetable(userID: number): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT c.* 
      FROM Course c
      inner JOIN Enrollment e
      ON c.id = e.course_id AND e.student_id = ?`,
      [userID]
    );
    return result;
  }

  async postQuestion(sessionID: number, studentID: number, Question: string): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Question (content, submit_time,student_id,session_id) VALUES (?, ?,?,?)',
      [Question, new Date(), studentID, sessionID]
    );
    return result.insertId;
  }

  async answerList(sessionID: number): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT
      q.content AS question,
      IFNULL(a.content, 'No answer yet') AS answer,
      IFNULL(u.name, 'No answer yet') AS answerBy,
      IF(a.id IS NOT NULL, 'done', 'pending') AS answerstatus
  FROM
      Question q
  LEFT JOIN
      Answer a ON q.id = a.question_id
  LEFT JOIN
      User u ON u.id = a.tutor_id
  WHERE
      q.session_id = ?;`,
      [sessionID]
    );
    return result;
  }

  async startSession(courseID: number): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Session (course_id, session_date,isactive) VALUES (?, ?,?)',
      [courseID, new Date(), 1]
    );
    return result.insertId;
  }

  //-------------------------------------------Tutor---------------------------------------------------//
  async fetchTutorClasses(TutorID: string): Promise<any> {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const [rows] = await this.databasePool.query(`
    SELECT c.*, s_latest.id AS session_id, IFNULL(s_latest.isactive, 0) AS isActive
    FROM Course c
    INNER JOIN Tutor_Course tc ON c.id = tc.course_id
    LEFT JOIN Session s_latest ON s_latest.id = (
        SELECT MAX(s.id)
        FROM Session s
        WHERE s.course_id = c.id
    )
    WHERE tc.tutor_id = ? AND c.session_day = ?;
    `, [TutorID, dayOfWeek]);
    return rows;
  }



  //ADMIN QUERIES AS PER ADMIN ROUTES:::::::
  //admin login//
  // async Alogin(Aemail: string, Apassword: string): Promise<boolean> {
  //   const [result] = await this.databasePool.query<ResultSetHeader>(
  //     'SELECT * FROM User WHERE email = ? AND password = ?',
  //     [Aemail, Apassword]
  //   );
  // }

  // 2.Get Stats for Classes (/admin/classes/stats) GET Request:
  // 'SELECT COUNT(*) AS class_count FROM Classes';

  // 3.Get Stats for QnA (/admin/QnA/stats) GET Request:
  // 'SELECT COUNT(*) AS qna_count FROM QnA';

  // 4.Get QnAs for Classes (/admin/classes/QnAs) GET Request:
  // 'SELECT * FROM QnA WHERE class_id = ?';

  // 5.Get QnAs for a Specific Class (/admin/classe/:classID/QnAs) GET Request:
  // 'SELECT * FROM QnA WHERE class_id = ?';

  // 6.Record Attendance for a Class (/admin/:classId/attendence) POST Request:
  // 'INSERT INTO Attendance (class_id, date, present_count) VALUES (?, ?, ?)';

  // 7.Create and Retrieve Questions (/admin/question) POST and GET Request:
  // 'INSERT INTO Question (text) VALUES (?)';
  // 'SELECT * FROM Question';

  // 8.Manage Timetable (/admin/timetable) GET, POST, DELETE, PUT Requests:
  // For GET: 'SELECT * FROM Timetable';
  // For POST: 'INSERT INTO Timetable (day, time, class_id) VALUES (?, ?, ?)';
  // For DELETE: 'DELETE FROM Timetable WHERE id = ?';
  // For PUT: 'UPDATE Timetable SET day = ?, time = ?, class_id = ? WHERE id = ?';

  // 9.Get Enrolments (/admin/enrolments) GET Request:
  // 'SELECT * FROM Enrolments';

  // 10.Get and Create Enrolments for a Specific Student (/admin/:studentID/enrolements) GET and POST Requests:
  // 'SELECT * FROM Enrolments WHERE student_id = ?';
  // 'INSERT INTO Enrolments (student_id, class_id) VALUES (?, ?)';




  // //STUDENT QUERIES AS PER STUDENT ROUTES:::::::

  // 1.Ulogin (/student/login) POST Request:
  // 'SELECT * FROM Students WHERE email = ? AND password = ?';

  // 2.Get Classes for a Student (/student/:studentID/classes) GET Request:
  // 'SELECT * FROM Classes WHERE studentID = ?';

  // 3.Get Class Details (/student/class) GET Request:
  // 'SELECT * FROM Classes WHERE class_id = ?';

  // 4.Mark Attendance (/student/attendence) POST Request:
  // 'INSERT INTO Attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)';

  // 5.Post a Question (/student/QnA) POST Request:
  // 'INSERT INTO QnA (student_id, question_text) VALUES (?, ?)';  

  // 6.Get Answer List (/student/QnA) GET Request:
  // 'SELECT * FROM QnA WHERE student_id = ?';

  // 7.Get Timetable (/student/timetable) GET Request:
  // 'SELECT * FROM Timetable';

  // 8.Get Courses (/student/courses) GET Request:
  // 'SELECT * FROM Courses';

  // 9.Get Enrollments for a Student (/student/:studentID/enrolements) GET Request:
  // 'SELECT * FROM Enrollments WHERE student_id = ?';

  // 10.Enroll a Student in a Course (/student/:studentID/enrolements) POST Request:
  // 'INSERT INTO Enrollments (student_id, course_id) VALUES (?, ?)';

  // 11.Submit Feedback (/student/:studentID/feedback) POST Request:
  // 'INSERT INTO Feedback (student_id, feedback_text) VALUES (?, ?)';



  // //TUTOR QUERIES AS PER TUTOR ROUTES::::::::

  // 1.Tutor Login (/tutor/login) POST Request:
  // 'SELECT * FROM Tutors WHERE email = ? AND password = ?';

  // 2.Get Classes for a Tutor (/tutor/classes) GET Request:
  // 'SELECT * FROM Classes WHERE tutor_id = ?';

  // 3.Get Class Details (/tutor/class) GET Request:
  // 'SELECT * FROM Classes WHERE class_id = ?';

  // 4.Mark Attendance for a Class (/tutor/:classId/attendance) POST Request:
  // 'INSERT INTO Attendance (class_id, date, present_count) VALUES (?, ?, ?)';
  //-----------------------------------------------------------------------------------------//
}
export const databaseService = new DatabaseService();
