import { Response, NextFunction } from "express";
import { UserRole } from "../utils/enums";
import { AuthRequest } from "../interfaces"; 

export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

      // user check
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }


      const userRole: UserRole = req.user.role;

      // role check
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      next();

    } catch {
      return res.status(500).json({
        message: "Role check failed",
      });
    }
  };
};











