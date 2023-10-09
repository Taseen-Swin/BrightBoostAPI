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
        app.route('/student/:studentID/classes')
        .get(this.studuentController.classes)
        app.route('/student/class')
        .get(this.studuentController.class)
        app.route('/student/attendence')
        .post(this.studuentController.markAttendence)
        app.route('/student/QnA')
        .post(this.studuentController.postQuestion)
        .get(this.studuentController.AnswerList)
        app.route('/student/timetable')
        .get(this.studuentController.timetable)
        app.route('/student/courses')
        .get(this.studuentController.courses)
        app.route('/student/:studentID/enrolements')
        .get(this.studuentController.enrolements)
        .post(this.studuentController.enrole)
        app.route('/student/:studentID/feedback')
        .post(this.studuentController.login)
    }
}