import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { UserRole } from "../utils/enums";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../interfaces";

import { AUTH_MESSAGES } from "../utils/messages";


const userRepo = AppDataSource.getRepository(User);

export class AuthService {

  // REGISTER
  static async register(data: RegisterInput) {

    const existingUser = await userRepo.findOne({
      where: { user_email: data.user_email },
    });

    if (existingUser) {
      throw new Error(AUTH_MESSAGES.Email_Already_Exist);
    }

    const hashed = await hashPassword(data.user_pass);

    //  role handling
    let assignedRole: UserRole = UserRole.CUSTOMER;

    if (data.role && Object.values(UserRole).includes(data.role)) {
      assignedRole = data.role;
    }

    const user = userRepo.create({
      first_name: data.first_name,
      last_name: data.last_name,
      user_email: data.user_email,
      user_pass: hashed,
      role: assignedRole,
    });

    await userRepo.save(user);

    return {
      message: AUTH_MESSAGES.USER_REGISTERD,
      user: {
        id: user.id,
        role: user.role,
      },
    };
  }

  // LOGIN
  static async login(data: LoginInput) {

    const user = await userRepo.findOne({
      where: { user_email: data.user_email },
    });

    if (!user) {
      throw new Error(AUTH_MESSAGES.INVALID_ID_CREDENTIALS);
    }

    const isMatch = await comparePassword(
      data.user_pass,
      user.user_pass
    );

    if (!isMatch) {
      throw new Error(AUTH_MESSAGES.INVALID_ID_CREDENTIALS);
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        role: user.role,
      },
    };
  }
}










