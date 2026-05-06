import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate, registerSchema, loginSchema } from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../utils/enums";

console.log("UserRole:", UserRole);

const router = Router();

// Auth
router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

// Profile
router.get("/profile", authMiddleware, AuthController.getProfile);
router.put("/profile", authMiddleware, AuthController.updateProfile);


//Role BAsed
router.get(
  "/seller",
  authMiddleware,
  roleMiddleware([UserRole.SELLER, UserRole.ADMIN]),
  (req, res) => {
    res.json({
      message: "Access granted to seller/admin"
    });
  }
);



export default router;



















