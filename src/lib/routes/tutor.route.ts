import { Express } from 'express';
import { TutorController } from '../contollers/tutor.controller';

export class TutorRoute {

    tutorController: TutorController = new TutorController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/student/login')
        .post(this.tutorController.login)
        app.route('/student/classes')
        .get(this.tutorController.login)
        app.route('/student/class')
        .get(this.tutorController.login)
        app.route('/student/:classId/attendence')
        .post(this.tutorController.login)
        app.route('/student/:classId/attendence')
        .post(this.tutorController.login)
    }
}