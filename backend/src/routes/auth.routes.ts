import { Router } from "express";
import { loggoutControler, loginController, refreshController, registerController } from "../controllers/auth.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { loginSchema, registerSchema } from "../validators/auth.validation.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(registerController)
);

router.post(
    "/login",
    validateRequest(loginSchema),
    asyncHandler(loginController)
)

router.post(
  "/logout",
  verifyJWT,
  asyncHandler(loggoutControler)
)

router.post(
"/refresh-token",
asyncHandler(refreshController)
)

export default router;
