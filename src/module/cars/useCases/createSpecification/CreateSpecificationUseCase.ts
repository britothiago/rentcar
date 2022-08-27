import { ISpecificationRepository } from "../../repositories/ISpeciticationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest) {
    const isSpecificationExist = this.specificationRepository.findByName(name);
    if (isSpecificationExist) {
      throw new Error("Specification already exists");
    }
    const specification = this.specificationRepository.create({
      name,
      description,
    });
    return specification;
  }
}
