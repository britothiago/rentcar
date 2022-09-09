import { Specification } from "../entities/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByIds(id: Specification[]): Promise<Specification[]>;
}
