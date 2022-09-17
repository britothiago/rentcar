import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

export class SendForgotPasswordController {
  async handle(request: Request, response: Response) {
    const sendForgotPasswordUseCase = container.resolve(
      SendForgotPasswordUseCase
    );

    await sendForgotPasswordUseCase.execute(request.body.email);
    return response.send();
  }
}
