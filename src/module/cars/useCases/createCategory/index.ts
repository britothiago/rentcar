import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export const createCategoryController = (): CreateCategoryController => {
  const createCategoryUseCase = new CreateCategoryUseCase(
    new CategoriesRepository()
  );
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
