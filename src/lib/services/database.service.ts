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
}

export const databaseService = new DatabaseService();
