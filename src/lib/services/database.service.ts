import sql, { config, ConnectionPool, IResult, Request, Transaction } from 'mysql';

import { Config } from '../models/config.model';
import { AnyARecord } from 'dns';


class DatabaseService {

  sqlConfig!: config;
  databasePool!: ConnectionPool;

  constructor() {
  }

  async init(configVars: Config): Promise<void> {
    this.sqlConfig = {
      user: configVars.DB_USER,
      password: configVars.DB_PASS,
      database: configVars.DB_NAME,
      server: configVars.DB_HOST,
      pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
        // encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    };
    await sql.connect(this.sqlConfig).then((pool: ConnectionPool) => {
      console.log('Database connected');
      this.databasePool = pool;
    });

  }

  getHealthStatus(): { is_healthy: boolean, is_connected: boolean } {
    return {
      is_healthy: this.databasePool.healthy,
      is_connected: this.databasePool.connected
    }
  }


  async login(email: string, password: string): Promise<boolean> {
    const request = this.databasePool.request();
    request.input('email', sql.VarChar, email);
    request.input('password', sql.VarChar, password);
    const res = await request.query(`SELECT CASE WHEN COUNT(id) >= 1 THEN 
    CAST ( 1 as BIT )
    ELSE
    CAST ( 0 as BIT )
    END AS userExist
    FROM User
    WHERE email = @email AND password = @password`);
    return res.recordset?.[0]?.userExist;
  }

  fetchClasses(stduentID: string): Promise<any> {
    const request = this.databasePool.request();
    request.input('stduentID', sql.Int, stduentID);
    const sqlQuery = `SELECT * from classes
    WHERE stduentID = @stduentID`;
    return request.query(sqlQuery);
  }
}

export const databaseService = new DatabaseService();