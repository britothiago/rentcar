import { inject, injectable } from "tsyringe";
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
      return {
        message: "Category already exists",
      };
    }
    const specification = await this.specificationRepository.create({
      name,
      description,
    });
    return specification;
  }
}
