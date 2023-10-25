import { Request, Response } from 'express';
import { databaseService } from '../services/database.service';
import { Config } from '../models/config.model';
import { config } from '../config/config';

export class AdminController {
  private config: Config;

  constructor() {
    this.config = config;
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
        const user = await databaseService.login(email, password,'admin');
        if (user.length) {
            res.status(200).json({ message: 'Login successfully!', user: user });
        } else {
            res.status(201).json({ message: 'Login unsuccessfully!' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  // async classesStats(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.classesStats();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult[0] });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async tutorQnAStats(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.tutorQnAStats();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult[0] });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async classesQnADetails(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.classesQnADetails();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult[0] });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async sessionQnADetails(req: Request, res: Response): Promise<void> {
  //   const { sessionID } = req.params;
  //   try {
  //     const queryResult = await databaseService.sessionQnADetails(sessionID);
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult[0] });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async timetable(req: Request, res: Response): Promise<void> {
  //   const { studentID } = req.params;
  //   try {
  //     const queryResult = await databaseService.timetable(studentID);
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async addTimetable(req: Request, res: Response): Promise<void> {
  //   const { courseID, day, slot } = req.body;
  //   try {
  //     const queryResult = await databaseService.addTimetable(courseID, day, slot);
  //     if (queryResult) {
  //       res.status(200).json({ message: 'successfully!' });
  //     } else {
  //       res.status(400).json({ message: 'unsuccessfully!' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async editTimetable(req: Request, res: Response): Promise<void> {
  //   const { courseID, day, slot } = req.body;
  //   try {
  //     const queryResult = await databaseService.editTimetable(courseID, day, slot);
  //     if (queryResult) {
  //       res.status(200).json({ message: 'successfully!' });
  //     } else {
  //       res.status(400).json({ message: 'unsuccessfully!' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async deleteTimetable(req: Request, res: Response): Promise<void> {
  //   const { courseID } = req.body;
  //   try {
  //     const queryResult = await databaseService.deleteTimetable(courseID);
  //     if (queryResult) {
  //       res.status(200).json({ message: 'successfully!' });
  //     } else {
  //       res.status(400).json({ message: 'unsuccessfully!' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async coursesWithStudentEnrolment(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.coursesWithStudentEnrolment();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async coursesWithStudentAttendance(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.coursesWithStudentAttendance();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async coursesWithQnAStats(req: Request, res: Response): Promise<void> {
  //   try {
  //     const queryResult = await databaseService.coursesWithQnAStats();
  //     if (queryResult.length) {
  //       res.status(200).json({ data: queryResult });
  //     } else {
  //       res.status(400).json({ message: 'No Data' });
  //     }
  //   } catch (error: any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}
