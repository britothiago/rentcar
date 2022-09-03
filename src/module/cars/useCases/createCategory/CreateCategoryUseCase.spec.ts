import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { ListCategoryUseCase } from "../listCategories/ListCategoryUseCase";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create a new category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  test("Should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Category",
      description: "Description",
    });

    return expect(category).toHaveProperty("id");
  });

  test("Should be not able to create a new category with same name", async () => {
    await createCategoryUseCase.execute({
      name: "New Category",
      description: "Description",
    });

    return expect(
      async () =>
        await createCategoryUseCase.execute({
          name: "New Category",
          description: "Description",
        })
    ).rejects.toBeInstanceOf(AppError);
  });
});
