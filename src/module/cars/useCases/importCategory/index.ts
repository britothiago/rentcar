import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export const importCategoryController = (): ImportCategoryController => {
  const importCategoryUseCase = new ImportCategoryUseCase(
    new CategoriesRepository()
  );
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return importCategoryController;
};
