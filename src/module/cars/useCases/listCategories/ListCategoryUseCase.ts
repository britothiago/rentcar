import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  execute() {
    return this.categoryRepository.list();
  }
}
