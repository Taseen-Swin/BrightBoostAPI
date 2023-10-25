import { Request, Response } from 'express';
import { databaseService } from '../services/database.service';
import { Config } from '../models/config.model';
import { config } from '../config/config';

export class TutorController {
    private config: Config;

    constructor() {
        this.config = config;
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const userExists = await databaseService.login(email, password);
            if (userExists) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(400).json({ message: 'Login unsuccessful!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async classes(req: Request, res: Response): Promise<void> {
        try {
            const { tutorID } = req.params;
            const queryResult = await databaseService.fetchClasses(tutorID);
            if (queryResult.length) {
                const result = queryResult[0];
                res.status(200).json({ data: result });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async startSession(req: Request, res: Response): Promise<void> {
        try {
            const { courseID, tutorID } = req.params;
            const queryResult = await databaseService.startSession(courseID, tutorID);
            if (queryResult) {
                res.status(200).json({ message: 'Session started successfully!' });
            } else {
                res.status(400).json({ message: 'Session start unsuccessful!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async class(req: Request, res: Response): Promise<void> {
        try {
            const { SessionID } = req.params;
            const queryResult = await databaseService.fetchClass(SessionID);
            if (queryResult.length) {
                const result = queryResult[0];
                res.status(200).json({ data: result });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async timetable(req: Request, res: Response): Promise<void> {
        try {
            const { tutorID } = req.params;
            const queryResult = await databaseService.timetable(tutorID);
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async questions(req: Request, res: Response): Promise<void> {
        try {
            const { SessionID, tutorID } = req.params;
            const queryResult = await databaseService.questions(SessionID, tutorID);
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async answer(req: Request, res: Response): Promise<void> {
        try {
            const { SessionID, tutorID, QuestionID } = req.body;
            const queryResult = await databaseService.answer(SessionID, tutorID, QuestionID);
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
