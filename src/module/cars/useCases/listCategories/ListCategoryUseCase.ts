import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  async execute() {
    return await this.categoryRepository.list();
  }
}
