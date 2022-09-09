import { Request, Response } from "express";
import { container } from "tsyringe";
import { sendFilesToAWS } from "../../../../config/aws";
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

    let filesNames: string[];

    Promise.all(images.map(async (file) => await sendFilesToAWS(file)))
      .then(async (urls) => {
        await repository.execute({
          id,
          image_name: urls,
        });
      })
      .catch((err) => {
        return response.status(400).send();
      });

    return response.status(201).send();
  }
}
