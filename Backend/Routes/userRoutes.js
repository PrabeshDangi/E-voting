import { Router } from "express";
const router = Router();
import { verifyJWT } from "../Middlewares/authMiddleware.js";

import {
  registerUser,
  logInUser,
  logOutUser,
  changeCurrentPassword,
} from "../Controllers/userController.js";

router.route("/signup").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/changepassword").post(verifyJWT, changeCurrentPassword);

export { router as userRoute };
