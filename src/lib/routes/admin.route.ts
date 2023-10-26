import { Express } from 'express';
import { AdminController } from '../contollers/admin.controller';

export class AdminRoute {

    adminController: AdminController = new AdminController;
    
    constructor(app: Express) {
        this.setupRoutes(app);
    }

    setupRoutes(app: Express): void {
        app.route('/admin/login')
        .post(this.adminController.login)
        app.route('/admin/course/stats')
        .get(this.adminController.coursesStats)
        app.route('/admin/TutorQnA/stats')
        .get(this.adminController.tutorQnAStats)
        app.route('/admin/studentSessionAttend/stats')
        .get(this.adminController.studentSessionAttend)
        app.route('/admin/QuestionAnswerEachSession/stats')
        .get(this.adminController.QuestionAnswerEachSession)
        app.route('/admin/QuestionAnswerEachCoursePercenatge/stats')
        .get(this.adminController.QuestionAnswerEachCoursePercenatge)
        app.route('/admin/enrolemetOverTime/stats')
        .get(this.adminController.enrolemetOverTime)
        app.route('/admin/QnADetails')
        .get(this.adminController.QnADetails)
        // app.route('/admin/classe/:classID/QnAs')
        // .get(this.adminController.sessionQnADetails)
        // app.route('/admin/:classId/attendence')
        // .post(this.adminController.attendence)
        // app.route('/admin/question')
        // .post(this.adminController.question)
        // .get(this.adminController.answers)
        app.route('/admin/timetable/:userID')
        .get(this.adminController.admintimetable)
        // .post(this.adminController.addTimetable)
        // .delete(this.adminController.deleteTimetable)
        // .put(this.adminController.editTimetable)
        // app.route('/admin/enrolments')
        // .get(this.adminController.coursesWithStudentEnrolment)
        // app.route('/admin/attendence')
        // .get(this.adminController.coursesWithStudentAttendance)
        // app.route('/admin/QnA')
        // .get(this.adminController.coursesWithQnAStats)

    }
}