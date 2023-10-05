import { Express } from 'express';
import { StudentController } from '../contollers/student.controller';

export class StudentRoute {

    stduentController: StudentController = new StudentController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/student/login')
        .post(this.stduentController.login)
    }
}