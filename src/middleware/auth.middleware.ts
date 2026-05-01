import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

 export const authMiddleware = (
    req: any,
    res: Response,
    next:NextFunction
 ) => {
    try{ 
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message : "no token provided"
            });
        }
            const decoded = verifyToken(token);
            req.user = decoded;

            next();
        }  catch {
            res.status(401).json ({
                message : "Invalid token"
            })
        }
    };








