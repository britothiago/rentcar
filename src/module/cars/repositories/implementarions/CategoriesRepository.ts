import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   return CategoriesRepository.INSTANCE
  //     ? CategoriesRepository.INSTANCE
  //     : (CategoriesRepository.INSTANCE = new CategoriesRepository());
  // }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });
    return category ? category : null;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
}
