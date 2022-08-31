import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationsController {
  async handle(request: Request, response: Response) {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase
    );
    return response.status(200).json(await listSpecificationUseCase.execute());
  }
}
