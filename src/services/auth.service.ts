import { AppDataSource } from "../config/database";
import { User , UserRole} from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);

export class AuthService {

  static async register(data: any) {

    const existingUser = await userRepo.findOne({
      where: { user_email: data.user_email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashed = await hashPassword(data.user_pass);

    const user = userRepo.create({
      first_name: data.first_name,   
      last_name: data.last_name,
      user_email: data.user_email,
      user_pass: hashed,            
      role: UserRole.CUSTOMER,
    });
    await userRepo.save(user);

    return { message: "User registered successfully" };
  }

  static async login(data: any) {

    const user = await userRepo.findOne({
      where: { user_email: data.user_email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(
      data.user_pass,
      user.user_pass    
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: "Login successful",
      token,
    };
  }
}











