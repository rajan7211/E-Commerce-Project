import { Request } from "express";
import { UserRole } from "./utils/enums";


//  AUTH 

export interface RegisterInput {
  first_name: string;
  last_name: string;
  user_email: string;
  user_pass: string;
  role?: UserRole;
}

export interface LoginInput {
  user_email: string;
  user_pass: string;
}


//  USER 

export interface IUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  user_email: string;
  role: UserRole;
}

//  PROFILE

export interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
}

// STORE 

export interface CreateStoreInput {
  name: string;
  description?: string;
}

// PRODUCT

export interface CreateProductInput {
  title: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
}


//  AUTH REQUEST 

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
  };
}





















