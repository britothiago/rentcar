import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export const listCategoriesController = (): ListCategoriesController => {
  const listCategoriesUseCase = new ListCategoryUseCase(
    new CategoriesRepository()
  );
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return listCategoriesController;
};
