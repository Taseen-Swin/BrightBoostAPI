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
        app.route('/tutor/classes/:tutorID')
        .get(this.tutorController.classes)
        app.route('/tutor/session')
        .post(this.tutorController.startSession)
        app.route('/tutor/session/end')
        .post(this.tutorController.endSession)
        app.route('/tutor/:sessionID/QnA')
        .get(this.tutorController.questions)
        .post(this.tutorController.answer)
        app.route('/tutor/timetable/:userID')
        .get(this.tutorController.timetable)
    }
}