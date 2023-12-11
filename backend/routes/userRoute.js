import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";
import { createEmailToken, getEmailToken } from "../controllers/emailTokenController.js";
import { sendEmail } from "../controllers/verificationEmailController.js";
//controller functions

const authRouter = express.Router();

//login route
authRouter.post("/login", loginUser);

//signup route
authRouter.post("/signup", signupUser);

//send verification email route
authRouter.post("/sendEmail", sendEmail);

//create email token
authRouter.post("/emailToken", createEmailToken)

//get email token
authRouter.post("/getEmailToken", getEmailToken)

export default authRouter;
