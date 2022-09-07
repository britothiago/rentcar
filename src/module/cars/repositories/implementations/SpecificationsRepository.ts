import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationsRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });
    return specification ? specification : null;
  }

  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }
}
