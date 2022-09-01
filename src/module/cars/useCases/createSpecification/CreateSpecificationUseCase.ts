import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpeciticationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const isSpecificationExist = await this.specificationRepository.findByName(
      name
    );
    if (isSpecificationExist) {
      throw new AppError("Specification already exists");
    }
    const specification = await this.specificationRepository.create({
      name,
      description,
    });
    return specification;
  }
}
