import { Express } from 'express';
import { AdminController } from '../contollers/admin.controller';

export class AdminRoute {

    studuentController: AdminController = new AdminController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/admin/login')
        .post(this.studuentController.login)
        app.route('/admin/classes/stats')
        .get(this.studuentController.login)
        app.route('/admin/QnA/stats')
        .get(this.studuentController.login)
        app.route('/admin/classes/QnAs')
        .get(this.studuentController.login)
        app.route('/admin/classe/:classID/QnAs')
        .get(this.studuentController.login)
        app.route('/admin/:classId/attendence')
        .post(this.studuentController.login)
        app.route('/admin/question')
        .post(this.studuentController.login)
        .get(this.studuentController.login)
        app.route('/admin/timetable')
        .get(this.studuentController.login)
        .post(this.studuentController.login)
        .delete(this.studuentController.login)
        .put(this.studuentController.login)
        app.route('/admin/enrolments')
        .get(this.studuentController.login)
        app.route('/admin/:studemtID/enrolements')
        .get(this.studuentController.login)
        .post(this.studuentController.login)
    }
}