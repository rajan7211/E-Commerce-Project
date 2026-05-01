import jwt, {Secret, SignOptions} from "jsonwebtoken"
import { env } from "../config/env"


export const generateToken = (payload: object)=> {
    return jwt.sign(
        payload,
        env.JWT_SECRET as Secret,
        {
            expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
        }
    )
}







