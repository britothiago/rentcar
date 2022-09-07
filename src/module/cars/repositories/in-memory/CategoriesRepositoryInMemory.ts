import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";
export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    if (this.categories.find((category) => category.name === name))
      throw new AppError("Category already exists");

    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
    return category;
  }
}
