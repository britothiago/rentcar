import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute({ description, name }: IRequest) {
    const isCategoryExists = await this.categoryRepository.findByName(name);

    if (isCategoryExists) {
      return {
        message: "Category already exists",
      };
    }
    const responseCategory = await this.categoryRepository.create({
      name,
      description,
    });
    return responseCategory;
  }
}
