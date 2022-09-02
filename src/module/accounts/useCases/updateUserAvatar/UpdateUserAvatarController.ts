import { Request, Response } from "express";
import { container } from "tsyringe";
import { sendFilesToAWS } from "../../../../config/aws";
import { clearUserData } from "../../../../helper/clearUserData";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const avatarFile = request.file;
    const url = await sendFilesToAWS(avatarFile);

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    const userUpdated = await updateUserAvatarUseCase.execute({
      avatarUrl: url,
      userId: id,
    });
    return response.json(clearUserData(userUpdated));
  }
}
