import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response) {
    const repository = container.resolve(UploadCarImageUseCase);
    const { id } = request.params;
    const images = request.files as IFiles[];
    console.log(
      "🚀 ~ file: UploadCarImageController.ts ~ line 14 ~ UploadCarImageController ~ handle ~ images",
      images
    );

    const filesNames = images.map((file) => file.filename);
    await repository.execute({
      id,
      image_name: filesNames,
    });

    return response.status(201).send();
  }
}
