import { Request, Response } from 'express';
import { databaseService } from '../services/database.service';
import { Config } from '../models/config.model';
import { config } from '../config/config';

export class TutorController {
    config: Config;

    constructor() {
        this.config = config;
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const userExist = await databaseService.login(email, password);
            if (userExist) {
                res.status(200).json({ message: 'Login successfully!' });
            } else {
                res.status(400).json({ message: 'Login unsuccessfully!' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async classes(req: Request, res: Response): Promise<void> {
        const { studentID } = req.params;
        try {
            const queryResult = await databaseService.fetchClasses(studentID);
            if (queryResult.length) { 
                let result = queryResult[0]; 
                res.status(200).json({ data: result });
            } else {
                res.status(400).json({ message: 'No Data' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
