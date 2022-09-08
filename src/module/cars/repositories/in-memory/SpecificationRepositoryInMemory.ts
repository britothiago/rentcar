import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationsRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(id: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
}
