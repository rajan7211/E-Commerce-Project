import { Response, NextFunction } from "express";
import { UserRole } from "../utils/enums";
import { AuthRequest } from "../interfaces"; 

import { AUTH_MESSAGES, COMMON_MESSAGES } from "../utils/messages";

export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

      // user check
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: AUTH_MESSAGES.UnAuthorized,
        });
      }


      const userRole: UserRole = req.user.role;

      // role check
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: AUTH_MESSAGES.Access_Denied,
        });
      }

      next();

    } catch {
      return res.status(500).json({
        message:COMMON_MESSAGES.SERVER_ERROR,
      });
    }
  };
};











