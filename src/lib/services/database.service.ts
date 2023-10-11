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

  async login(email: string, password: string): Promise<boolean> {
    const [rows]: any = await this.databasePool.query(
      'SELECT CASE WHEN COUNT(id) >= 1 THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS userExist FROM User WHERE email = ? AND password = ?',
      [email, password]
    );

    return rows[0]?.userExist === 1;

  }

  async fetchClasses(studentID: string): Promise<any> {

    const [rows] = await this.databasePool.query('SELECT * FROM classes WHERE studentID = ?', [studentID]);
    return rows;
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



  //-----------------------------------------------------------------------------------------------//
  
  //ADMIN QUERIES AS PER ADMIN ROUTES:::::::
    //admin login//
    async Alogin(Aemail: string, Apassword: string): Promise<boolean> {
      const [result] = await this.databasePool.query<ResultSetHeader>(
    'SELECT * FROM User WHERE email = ? AND password = ?',
    [Aemail, Apassword]
    );
  }
  
    2.Get Stats for Classes (/admin/classes/stats) GET Request:
    'SELECT COUNT(*) AS class_count FROM Classes';
  
    3.Get Stats for QnA (/admin/QnA/stats) GET Request:
    'SELECT COUNT(*) AS qna_count FROM QnA';
  
    4.Get QnAs for Classes (/admin/classes/QnAs) GET Request:
    'SELECT * FROM QnA WHERE class_id = ?';
  
    5.Get QnAs for a Specific Class (/admin/classe/:classID/QnAs) GET Request:
    'SELECT * FROM QnA WHERE class_id = ?';
  
    6.Record Attendance for a Class (/admin/:classId/attendence) POST Request:
    'INSERT INTO Attendance (class_id, date, present_count) VALUES (?, ?, ?)';
  
    7.Create and Retrieve Questions (/admin/question) POST and GET Request:
    'INSERT INTO Question (text) VALUES (?)';
    'SELECT * FROM Question';
  
    8.Manage Timetable (/admin/timetable) GET, POST, DELETE, PUT Requests:
    For GET: 'SELECT * FROM Timetable';
    For POST: 'INSERT INTO Timetable (day, time, class_id) VALUES (?, ?, ?)';
    For DELETE: 'DELETE FROM Timetable WHERE id = ?';
    For PUT: 'UPDATE Timetable SET day = ?, time = ?, class_id = ? WHERE id = ?';
  
    9.Get Enrolments (/admin/enrolments) GET Request:
    'SELECT * FROM Enrolments';
  
    10.Get and Create Enrolments for a Specific Student (/admin/:studentID/enrolements) GET and POST Requests:
    'SELECT * FROM Enrolments WHERE student_id = ?';
    'INSERT INTO Enrolments (student_id, class_id) VALUES (?, ?)';


    

    //STUDENT QUERIES AS PER STUDENT ROUTES:::::::

    1.Ulogin (/student/login) POST Request:
    'SELECT * FROM Students WHERE email = ? AND password = ?';

    2.Get Classes for a Student (/student/:studentID/classes) GET Request:
    'SELECT * FROM Classes WHERE studentID = ?';

    3.Get Class Details (/student/class) GET Request:
    'SELECT * FROM Classes WHERE class_id = ?';

    4.Mark Attendance (/student/attendence) POST Request:
    'INSERT INTO Attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)';

    5.Post a Question (/student/QnA) POST Request:
    'INSERT INTO QnA (student_id, question_text) VALUES (?, ?)';  

    6.Get Answer List (/student/QnA) GET Request:
    'SELECT * FROM QnA WHERE student_id = ?';

    7.Get Timetable (/student/timetable) GET Request:
    'SELECT * FROM Timetable';

    8.Get Courses (/student/courses) GET Request:
    'SELECT * FROM Courses';

    9.Get Enrollments for a Student (/student/:studentID/enrolements) GET Request:
    'SELECT * FROM Enrollments WHERE student_id = ?';

    10.Enroll a Student in a Course (/student/:studentID/enrolements) POST Request:
    'INSERT INTO Enrollments (student_id, course_id) VALUES (?, ?)';

    11.Submit Feedback (/student/:studentID/feedback) POST Request:
    'INSERT INTO Feedback (student_id, feedback_text) VALUES (?, ?)';


    
    //TUTOR QUERIES AS PER TUTOR ROUTES::::::::

    1.Tutor Login (/tutor/login) POST Request:
    'SELECT * FROM Tutors WHERE email = ? AND password = ?';

    2.Get Classes for a Tutor (/tutor/classes) GET Request:
    'SELECT * FROM Classes WHERE tutor_id = ?';

    3.Get Class Details (/tutor/class) GET Request:
    'SELECT * FROM Classes WHERE class_id = ?';

    4.Mark Attendance for a Class (/tutor/:classId/attendance) POST Request:
    'INSERT INTO Attendance (class_id, date, present_count) VALUES (?, ?, ?)';
    //-----------------------------------------------------------------------------------------//
  }
export const databaseService = new DatabaseService();
