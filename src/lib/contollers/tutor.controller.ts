import { IResult } from 'mysql';
import { databaseService } from '../services/database.service';
import { Request, Response } from 'express';
import { Config } from '../models/config.model';
import { config } from '../config/config';


export class TutorController {
    config: Config ;
    constructor() {
        this.config= config

    }

    //================================================Getters==========================================================================
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const userExist = await databaseService.login(email, password);
            if (userExist) {
                res.status(200).json({ message: 'Login successfully!' });
            } else {
                res.status(400).json({ message: 'Login unsuccessfully!' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }



}
