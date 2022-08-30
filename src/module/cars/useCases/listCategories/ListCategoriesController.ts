import { Request, Response } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  async handle(request: Request, response: Response) {
    const categoriesList = await this.listCategoryUseCase.execute();
    return response.status(200).json(categoriesList);
  }
}
