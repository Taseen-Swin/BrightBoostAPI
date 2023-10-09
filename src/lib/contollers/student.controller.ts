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
            const userExists = await databaseService.login(email, password);
            if (userExists) {
                res.status(200).json({ message: 'Login successfully!' });
            } else {
                res.status(400).json({ message: 'Login unsuccessfully!' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async classes(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.fetchClasses(studentID);
            if (queryResult.length) {
                const result = queryResult[0];
                res.status(200).json({ data: result });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async class(req: Request, res: Response): Promise<void> {
        const { SessionID } = req.params;
        try {
            const queryResult = await databaseService.fetchClass(SessionID);
            if (queryResult.length) {
                const result = queryResult[0];
                res.status(200).json({ data: result });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async markAttendance(req: Request, res: Response): Promise<void> {
        const { SessionID, studentID } = req.body;
        try {
            const result = await databaseService.markAttendance(SessionID, studentID);
            if (result) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(400).json({ message: 'Unsuccessfully!' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async postQuestion(req: Request, res: Response): Promise<void> {
        const { SessionID, studentID } = req.body;
        try {
            const result = await databaseService.postQuestion(SessionID, studentID);
            if (result) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(400).json({ message: 'Unsuccessfully!' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async answerList(req: Request, res: Response): Promise<void> {
        const { SessionID, studentID } = req.body;
        try {
            const result = await databaseService.answerList(SessionID, studentID);
            if (result) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(400).json({ message: 'Unsuccessfully!' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async timetable(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.timetable(studentID);
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async courses(req: Request, res: Response): Promise<void> {
        try {
            const queryResult = await databaseService.courses();
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async enrollments(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.enrollments(studentID);
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async enroll(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.enroll();
            if (queryResult) {
                res.status(200).json({ message: 'Successfully!' });
            } else {
                res.status(400).json({ message: 'Unsuccessfully!' });
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }
}
