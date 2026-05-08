import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { RegisterInput, LoginInput, UpdateProfileInput } from "../interfaces";

import { USER_MESSAGES, COMMON_MESSAGES } from "../utils/messages";

const userRepo = AppDataSource.getRepository(User);

export class AuthController {

  // REGISTER
  static async register(req: Request, res: Response) {
    try {
      const data: RegisterInput = req.body; 
      const result = await AuthService.register(data);

      res.status(201).json(result);

    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }

  

  // LOGIN
  static async login(req: Request, res: Response) {
    try {
      const data: LoginInput = req.body; 
      const result = await AuthService.login(data);

      res.status(200).json(result);

    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }

  //  PROFILE
  static async getProfile(req: any, res: Response) {
    try {
      const userId = req.user.id;

      const user = await userRepo.findOne({
        where: { id: userId },
        select: ["id", "first_name", "last_name", "user_email", "role"],
      });

      if (!user) {
        return res.status(404).json({
          message: USER_MESSAGES.USER_NOT_FOUND,
        });
      }

      res.status(200).json({
        message: USER_MESSAGES.PROFILE_FETCHED,
        user,
      });

    } catch (err: any) {
      res.status(500).json({
        message: err.message || COMMON_MESSAGES.SERVER_ERROR,
      });
    }
  }

  // UPDATE PROFILE
  static async updateProfile(req: any, res: Response) {
    try {
      const userId = req.user.id;

      const data: UpdateProfileInput = req.body;   

      const user = await userRepo.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          message: USER_MESSAGES.USER_NOT_FOUND,
        });
      }

      if (data.first_name) user.first_name = data.first_name;
      if (data.last_name) user.last_name = data.last_name;

      await userRepo.save(user);

      res.status(200).json({
        message: USER_MESSAGES.PROFILE_UPDATED,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_email: user.user_email,
        },
      });

    } catch (err: any) {
      res.status(500).json({
        message: err.message || COMMON_MESSAGES.SERVER_ERROR,
      });
    }
  }
}






















