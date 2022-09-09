import { Request, Response } from "express";
import { container } from "tsyringe";
import { sendFilesToAWS } from "../../../../config/aws";
import { AppError } from "../../../../errors/AppError";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
  path: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response) {
    const repository = container.resolve(UploadCarImageUseCase);
    const { id } = request.params;
    const images = request.files as IFiles[];

    Promise.all(images.map(async (file) => await sendFilesToAWS(file)))
      .then(async (urls) => {
        await repository.execute({
          id,
          image_name: urls,
        });
        return response.status(201).send();
      })
      .catch((err) => {
        throw new AppError(`Bad request | ${err}`);
      });
  }
}
