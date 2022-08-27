import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationsController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}
  handle(request: Request, response: Response) {
    return response.status(200).json(this.listSpecificationUseCase.execute());
  }
}
