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
        // app.route('/tutor/classes')
        // .get(this.tutorController.classes)
        // app.route('/tutor/class')
        // .get(this.tutorController.class)
        // app.route('/tutor/:classId/session')
        // .post(this.tutorController.startSession)
        // app.route('/tutor/:classId/QnA')
        // .get(this.tutorController.questions)
        // .post(this.tutorController.answers)
        // app.route('/tutor/:tutorID/timetable')
        // .get(this.tutorController.timetable)
    }
}