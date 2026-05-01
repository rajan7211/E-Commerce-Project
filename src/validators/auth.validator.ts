import Joi from "joi";
export const registerSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
    }),

  last_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
    }),

  user_email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  user_pass: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),

  role: Joi.string()
    .valid("customer", "seller")  
    .default("customer")
    .messages({
      "any.only": "Role must be either 'customer' or 'seller'",
    }),
});


export const loginSchema = Joi.object({
  user_email: Joi.string() 
  .email()  
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  user_pass: Joi.string()  
    .required()
    .messages({
      "string.empty": "Password is required",
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


















