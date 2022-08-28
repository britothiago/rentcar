import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response) {
    const { file } = request;
    const enabledCategories = await this.importCategoryUseCase.loadCategories(
      file
    );
    const categoriesCreated = await this.importCategoryUseCase.execute(
      enabledCategories
    );
    return response.status(201).json(categoriesCreated);
  }
}
