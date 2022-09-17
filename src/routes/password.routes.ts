import { Router } from "express";
import { SendForgotPasswordController } from "../module/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController";

export const passwordRoutes = Router();

const forgotPassword = new SendForgotPasswordController();

passwordRoutes.post("/forgot", forgotPassword.handle);
