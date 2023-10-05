import { IResult } from 'mysql';
import { databaseService } from '../services/database.service';
import { Request, Response } from 'express';
import { Config } from '../models/config.model';
import { config } from '../config/config';


export class AdminController {
    config: Config ;
    constructor() {
        this.config= config

    }

    //================================================Getters==========================================================================

    login(req: Request, res: Response): void {

            res.status(200).json("Login");
   
    }



}
