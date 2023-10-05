import { Express } from 'express';
import { StudentController } from '../contollers/student.controller';

export class StudentRoute {

    studuentController: StudentController = new StudentController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/student/login')
        .post(this.studuentController.login)
        app.route('/student/classes')
        .get(this.studuentController.login)
        app.route('/student/class')
        .get(this.studuentController.login)
        app.route('/student/:classId/attendence')
        .post(this.studuentController.login)
        app.route('/student/:classId/attendence')
        .post(this.studuentController.login)
        app.route('/student/question')
        .post(this.studuentController.login)
        .get(this.studuentController.login)
        app.route('/student/timetable')
        .get(this.studuentController.login)
        app.route('/student/enrolments')
        .get(this.studuentController.login)
        app.route('/student/:studemtID/enrolements')
        .get(this.studuentController.login)
        .post(this.studuentController.login)
    }
}