import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private listSpecificationRepository: ISpecificationRepository
  ) {}

  async execute() {
    return await this.listSpecificationRepository.list();
  }
}
