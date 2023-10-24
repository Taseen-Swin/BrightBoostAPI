import { Express } from 'express';
import { TutorController } from '../contollers/tutor.controller';

export class TutorRoute {

    tutorController: TutorController = new TutorController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/tutor/login')
        .post(this.tutorController.login)
        app.route('/tutor/classes')
        .get(this.tutorController.login)
        app.route('/tutor/class')
        .get(this.tutorController.login)
        app.route('/tutor/:classId/attendence')
        .post(this.tutorController.login)
        app.route('/tutor/:classId/attendence')
        .post(this.tutorController.login)
    }
}