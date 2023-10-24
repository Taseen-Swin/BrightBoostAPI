import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cors from 'cors';

import { databaseService } from './services/database.service';

import { Config } from './models/config.model';

import { StudentRoute } from './routes/student.route';
import { AdminRoute } from './routes/admin.route';
import { TutorRoute } from './routes/tutor.route';



export class ExpressServer {
    config: Config;
    app: Express;

    /**
     * Creates a new instance of the express server
     * @param {Config} config - Application configuration from environment variables
     */
    constructor(config: Config) {
        this.config = config;
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    async setup(): Promise<void> {
        await databaseService.init(this.config);
        this.app.listen(this.config.PORT, () => {
            console.log(`Server is up and running at Port: ${this.config.PORT}`);
        });
        this.setupRoutes();
    }

    setupRoutes(): void {
        new StudentRoute(this.app);
        new TutorRoute(this.app);
        new AdminRoute(this.app)
    }


    getApp(): Express {
        return this.app;
    }
}

