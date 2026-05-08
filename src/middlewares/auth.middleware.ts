import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../interfaces";
import { AUTH_MESSAGES } from "../utils/messages";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: AUTH_MESSAGES.Token_Required,
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded; 

    next();
  } catch {
    return res.status(401).json({
      message: AUTH_MESSAGES.Invalid_Token,
    });
  }
};









