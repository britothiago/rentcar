import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const listCategoriesUseCase = new ListCategoryUseCase(
  CategoriesRepository.getInstance()
);
export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);
