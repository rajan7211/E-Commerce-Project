import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "../entities/User";


interface JwtPayload {
  id: number;
  role: UserRole;
}


export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    env.JWT_SECRET as string,
    options
  );
};


export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET as string
    );

    if (typeof decoded === "object" && decoded !== null) {
      return decoded as JwtPayload;
    }

    throw new Error("Invalid token payload");

  } catch (error: any) {
    throw new Error(error.message || "Invalid token");
  }
};
















