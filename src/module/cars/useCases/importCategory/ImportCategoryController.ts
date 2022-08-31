import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    if (!file) return response.status(400).json({ message: "CSV not found" });
    const enabledCategories = await importCategoryUseCase.loadCategories(file);
    const categoriesCreated = await importCategoryUseCase.execute(
      enabledCategories
    );
    return response.status(201).json(categoriesCreated);
  }
}
