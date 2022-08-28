import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase(
  CategoriesRepository.getInstance()
);
export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
