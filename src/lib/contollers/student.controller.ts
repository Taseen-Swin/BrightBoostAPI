import { Request, Response } from 'express';
import { databaseService } from '../services/database.service';
import { Config } from '../models/config.model';
import { config } from '../config/config';

export class StudentController {
    config: Config;

    constructor() {
        this.config = config;
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const user = await databaseService.login(email, password, 'student');
            if (user.length) {
                res.status(200).json({ message: 'Login successfully!', user: user });
            } else {
                res.status(201).json({ message: 'Login unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        const { email, name, password } = req.body;
        try {
            const userID = await databaseService.insertUser(name, email, password, 'Student');
            if (userID) {
                res.status(200).json({ message: 'successfully!', UserID: userID });
            } else {
                res.status(201).json({ message: 'Un successfully!' });
            }
        } catch (error: any) {
            res.status(201).json({ message: "User Already Exist" });
        }
    }

    async classes(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.fetchClasses(studentID);
            if (queryResult.length) {
                const result = queryResult;
                res.status(200).json({ data: result });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async class(req: Request, res: Response): Promise<void> {
        const { sessionID } = req.params;
        try {
            const queryResult = await databaseService.fetchClass(sessionID);
            if (queryResult.length) {
                const result = queryResult[0];
                const formattedResult = {
                    id: result.id,
                    course_id: result.course_id,
                    session_date: result.session_date,
                    isactive: result.isactive,
                    course_name: result.course_name,
                    tutor_names: result.tutor_names.split(',').map((name: string) => name.trim()),
                };
                res.status(200).json({ data: formattedResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAttendance(req: Request, res: Response): Promise<void> {
        const { studentID, sessionID } = req.params;
        try {
            const queryResult = await databaseService.getAttendance(studentID, sessionID);
            if (queryResult.length) {
                const result = queryResult;
                res.status(200).json({ data: result });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    async markAttendance(req: Request, res: Response): Promise<void> {
        const { studentID, sessionID } = req.params;
        try {
            const result = await databaseService.markAttendance(parseInt(studentID), parseInt(sessionID));
            if (result) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(201).json({ message: 'Unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async postQuestion(req: Request, res: Response): Promise<void> {
        const { question, studentID } = req.body;
        const { sessionID } = req.params;
        try {
            const result = await databaseService.postQuestion(parseInt(sessionID), studentID, question);
            if (result) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(201).json({ message: 'Unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async answerList(req: Request, res: Response): Promise<void> {
        const { sessionID } = req.params;
        try {
            const result = await databaseService.answerList(parseInt(sessionID));
            if (result) {
                res.status(200).json({ data: result });
            } else {
                res.status(201).json({ message: 'Unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async timetable(req: Request, res: Response): Promise<void> {
        const { userID } = req.params;
        try {
            const queryResult = await databaseService.timetable(parseInt(userID));
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async courses(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.fetchCourses();
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async enrollments(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.fetchStudentEnrolments(parseInt(studentID));
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async enroll(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        const { courseID } = req.body;
        try {
            const queryResult = await databaseService.insertStudentEnrolments(parseInt(studentID), parseInt(courseID));
            if (queryResult) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(201).json({ message: 'Unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
