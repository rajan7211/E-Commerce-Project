import Joi from "joi";
import { VALIDATION_MESSAGES } from "../utils/messages";
export const registerSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.FIRST_NAME_REQUIRED,
      "string.min": VALIDATION_MESSAGES.FIRST_NAME_MIN,
    }),

  last_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.LAST_NAME_REQUIRED,
      "string.min": VALIDATION_MESSAGES.LAST_NAME_MIN,
    }),

  user_email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": VALIDATION_MESSAGES.INVALID_EMAIL,
      "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED,
    }),

  user_pass: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": VALIDATION_MESSAGES.PASSWORD_MIN,
      "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
    }),

  role: Joi.string()
    .valid("customer", "seller")  
    .default("customer")
    .messages({
      "any.only": VALIDATION_MESSAGES.INVALID_ROLE,
    }),
});


export const loginSchema = Joi.object({
  user_email: Joi.string() 
  .email()  
    .required()
    .messages({
      "string.email": VALIDATION_MESSAGES.INVALID_EMAIL,
      "string.empty": VALIDATION_MESSAGES.EMAIL_REQUIRED,
    }),

  user_pass: Joi.string()  
    .required()
    .messages({
      "string.empty": VALIDATION_MESSAGES.PASSWORD_REQUIRED,
    }),
});

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    req.body = value;
    next();
  };
};


















