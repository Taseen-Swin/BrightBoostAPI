import sql, { config, ConnectionPool, IResult, Request, Transaction } from 'mysql';

import { Config } from '../models/config.model';


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

  getHealthStatus(): { is_healthy: boolean, is_connected: boolean} {
    return {
      is_healthy: this.databasePool.healthy,
      is_connected: this.databasePool.connected
    }
  }

  //====================================================Boolean Checks===============================================================

}

export const databaseService = new DatabaseService();