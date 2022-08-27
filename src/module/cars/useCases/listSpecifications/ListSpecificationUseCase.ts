import { ISpecificationRepository } from "../../repositories/ISpeciticationsRepository";

export class ListSpecificationUseCase {
  constructor(private listSpecificationRepository: ISpecificationRepository) {}

  execute() {
    return this.listSpecificationRepository.list();
  }
}
