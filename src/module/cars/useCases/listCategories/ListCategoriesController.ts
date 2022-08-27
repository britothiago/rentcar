import { Request, Response } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const categoriesList = this.listCategoryUseCase.execute();
    return response.status(200).json(categoriesList);
  }
}
