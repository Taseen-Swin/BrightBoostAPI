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
        const { email, password } = req.body;
        try {
            const user = await databaseService.login(email, password, 'tutor');
            if (user.length) {
                res.status(200).json({ message: 'Login successfully!', user: user });
            } else {
                res.status(201).json({ message: 'Login unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async classes(req: Request, res: Response): Promise<void> {
        try {
            const { tutorID } = req.params;
            const queryResult = await databaseService.fetchTutorClasses(tutorID);
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

    async startSession(req: Request, res: Response): Promise<void> {
        try {
            const { courseID } = req.body;
            const queryResult = await databaseService.startSession( courseID);
            if (queryResult) {
                res.status(200).json({ message: 'Session started successfully!' });
            } else {
                res.status(201).json({ message: 'Session start unsuccessful!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async endSession(req: Request, res: Response): Promise<void> {
        try {
            const { sessionID } = req.body;
            const queryResult = await databaseService.EndSession(sessionID);
            if (queryResult) {
                res.status(200).json({ message: 'Session end successfully!' });
            } else {
                res.status(201).json({ message: 'Session end unsuccessful!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // async class(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { SessionID } = req.params;
    //         const queryResult = await databaseService.fetchClass(SessionID);
    //         if (queryResult.length) {
    //             const result = queryResult[0];
    //             res.status(200).json({ data: result });
    //         } else {
    //             res.status(201).json({ message: 'No Data' });
    //         }
    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

    async timetable(req: Request, res: Response): Promise<void> {
        const { userID } = req.params;
        try {
            const queryResult = await databaseService.Tutortimetable(parseInt(userID));
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async questions(req: Request, res: Response): Promise<void> {
        try {
            const { sessionID } = req.params;
            const queryResult = await databaseService.tutorQuestion(parseInt(sessionID));
            if (queryResult.length) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async answer(req: Request, res: Response): Promise<void> {
        try {
            const { sessionID } = req.params;
            const { answer, tutorID, questionID } = req.body;
            const queryResult = await databaseService.submitAnswer(answer, tutorID, questionID,sessionID);
            if (queryResult) {
                res.status(200).json({ data: queryResult });
            } else {
                res.status(201).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
