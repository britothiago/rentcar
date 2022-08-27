import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest) {
    const isCategoryExists = this.categoryRepository.findByName(name);
    if (isCategoryExists) {
      throw new Error("Category already exists");
    }
    const responseCategory = this.categoryRepository.create({
      name,
      description,
    });
    return responseCategory;
  }
}
