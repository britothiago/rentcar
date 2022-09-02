import { Request, Response } from "express";
import { container } from "tsyringe";
import { sendFilesToAWS } from "../../../../config/aws";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { driver_license, email, name, password } = request.body;

    const avatarFile = request.file;
    let url = "";
    if (avatarFile) {
      url = await sendFilesToAWS(avatarFile);
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute({
      driver_license,
      email,
      name,
      password,
      avatar: url,
    });
    return response.status(201).json(user);
  }
}
