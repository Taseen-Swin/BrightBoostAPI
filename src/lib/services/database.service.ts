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

  async login(email: string, password: string): Promise<any> {
    const [result]: any = await this.databasePool.query(
      'SELECT id,email,type FROM User WHERE email = ? AND password = ?',
      [email, password]
    );

    return result;

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

  async insertStudentEnrolments(userID: number, CourseID: number): Promise<number | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'INSERT INTO Enrollment (student_id, course_id) VALUES (?, ?)',
      [userID, CourseID]
    );
    return result.insertId;
  }

  async fetchStudentEnrolments(userID: number): Promise<any | null> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'SELECT * FROM Enrollment e inner join Course c on e.course_id = c.id where e.student_id = ?',
      [userID]
    );
    return result;
  }


  //-----------------------------------------------------------------------------------------------//

  //ADMIN QUERIES AS PER ADMIN ROUTES:::::::
  //admin login//
  async Alogin(Aemail: string, Apassword: string): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'SELECT * FROM User WHERE email = ? AND password = ?',
      [Aemail, Apassword]
    );
    return result;
  }
  
  // Get class stats
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
  
  // Get Q&A stats
  async QAstats(QAstats: string, id:number ): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'SELECT COUNT(*) AS total_questions FROM Question',
      [QAstats, id]
    );
    return result;
  }
  
  // Get all Q&As
  async fetchAllQA(QAid: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT q.*
            FROM Question q
            JOIN Course c ON q.course_id = c.id`,
      [QAid]
    );
    return result;
  }
  
  // Get Q&As for a class
  async QAclass(QAclass: string, classid: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT q.*  
            FROM Question q 
            JOIN Course c ON q.course_id = c.id
            WHERE c.id = ?`,
      [QAclass, classid]
    );
    return result;
  }
  
  // Get attendance for a session  
  async Asession(QAclass: string, attendance: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT a.* 
            FROM Attendance a
            JOIN Session s ON a.session_id = s.id
            WHERE s.id = ?`,
      [QAclass, attendance]
    );
    return result;
  }
  
  // Get all questions
  async AllQuestion(AllQuestion: string): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT q.*
            FROM Question q
            JOIN Course c ON q.course_id = c.id`,
      [AllQuestion]
    );
    return result;
  }
  
  // Get/update timetable
  async timetable(timetable: string, id: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT s.* 
            FROM Session s
            JOIN Course c ON s.course_id = c.id`,
            `UPDATE Session s
            JOIN Course c ON s.course_id = c.id 
            SET s.session_date = ?
            WHERE s.id = ?`,
      [timetable, id]
    );
    return result;
  }
  
  // Delete session
  async deleteSession(id: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      'DELETE FROM Session WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
  
  // Get all enrollments
  async fetchAllEnrollments(userID: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT e.*
            FROM Enrollment e
            JOIN User u ON e.student_id = u.id`,
      [userID]
    );
    return result;
  }
  
  // Get student enrollments 
  async fetchStudentEnrollments(userID: number): Promise<boolean> {
    const [result] = await this.databasePool.query<ResultSetHeader>(
      `SELECT e.* 
            FROM Enrollment e
            JOIN User u ON e.student_id = u.id
            WHERE u.id = ?`,
      [userID]
    );
    return result;
  }


  // //STUDENT QUERIES AS PER STUDENT ROUTES:::::::

// Student login
async studentLogin(email: string, password: string): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT * FROM User WHERE email = ? AND password = ? AND type = 'student'`,
    [email,password]
  );
  return result;
}

// Student signup
async studentSignup(email: string, password: string, name: string): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `INSERT INTO User (name, email, password, type) 
            VALUES (?, ?, ?, 'student')`,
    [email,password,name]
  );
  return result;
}


// Get student's classes
async fetchstudentclasses(userID: number, course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT c.* 
            FROM Course c 
            JOIN Enrollment e ON c.id = e.course_id
            WHERE e.student_id = ?`,
    [userID,course_id]
  );
  return result;
}


// Get class details
async fetchclass(classID: number, course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT * FROM Course WHERE id = ?`,
    [classID,course_id]
  );
  return result;
}


// Mark student attendance 
async studentAttendence(classID: number, userID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `INSERT INTO Attendance (student_id, session_id, status)
            VALUES (?, ?, ?)`,
    [classID,userID]
  );
  return result;
}


// Post question
async PostQuestion(classID: number, course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `INSERT INTO Question (content, student_id, course_id, session_id)
            VALUES (?, ?, ?, ?)`,
    [classID,course_id]
  );
  return result;
}

// Get student's questions and answers
async GetQandA(classID: number, userID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT q.*, a.content AS answer
            FROM Question q
            LEFT JOIN Answer a ON a.question_id = q.id
            WHERE q.student_id = ?`,
    [classID,userID]
  );
  return result;
}  

// Get student timetable
async fetchstudentTB(classID: number, userID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT s.* 
            FROM Session s
            JOIN Enrollment e ON s.course_id = e.course_id
            WHERE e.student_id = ?`,
    [classID,userID]
  );
  return result;
}  

// Get available courses
async fetchcourses(course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT * FROM Course`,
    [course_id]
  );
  return result;
}  


// Enroll student in course
async EnrollStudent(course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `INSERT INTO Enrollment (student_id, course_id) VALUES (?, ?)`,
    [course_id]
  );
  return result;
}  



  // //TUTOR QUERIES AS PER TUTOR ROUTES::::::::

// Tutor login
async TutorLogin(email: string, password: string): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT * FROM User WHERE email = ? AND password = ? AND type = 'tutor'`,
    [email,password]
  );
  return result;
}

// Get classes for tutor 
async fetchclassforTutor(classID: number, tutor_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT c.*  
            FROM Course c
            JOIN Tutor_Course tc ON tc.course_id = c.id
            WHERE tc.tutor_id = ?`,
    [classID,tutor_id]
  );
  return result;
}

// Get attendance for a class 
async FetchAttendenceofClass(classID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT a.*
            FROM Attendance a 
            JOIN Session s ON a.session_id = s.id
            WHERE s.course_id = ?`,
    [classID]
  );
  return result;
} 


// Mark student attendance
async MarkAttendence(classID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
      `INSERT INTO Attendance (student_id, session_id, status)
            VALUES (?, ?, ?)`,
    [classID]
  );
  return result;
} 

// Get questions for a class
async fetchQuetionforClass(classID: number, course_id: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `SELECT q.* 
            FROM Question q
            JOIN Session s ON q.session_id = s.id
            WHERE s.course_id = ?`,
    [classID,course_id]
  );
  return result;
}  


// Answer a question
async AnswerQuetion(classID: number, userID: number): Promise<boolean> {
  const [result] = await this.databasePool.query<ResultSetHeader>(
    `INSERT INTO Answer (content, tutor_id, question_id) 
            VALUES (?, ?, ?)`,
    [classID,userID]
  );
  return result;
}  
  //-----------------------------------------------------------------------------------------//
}
export const databaseService = new DatabaseService();
