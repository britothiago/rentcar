import { Specification } from "../entities/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Specification;
  create({ name, description }: ISpecificationDTO): Specification;
  list(): Specification[];
}
