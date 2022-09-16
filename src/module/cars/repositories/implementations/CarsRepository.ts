import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";
interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
  available?: boolean;
}

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async updateAvailableStatusCar(id: string, status: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Car)
      .set({ available: status })
      .where("id = :id", { id })
      .execute();
  }

  async findByLicensePlate(license_place: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_place } });
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne({ where: { id } });
  }

  async list({
    brand,
    category_id,
    name,
    available,
  }: IRequest): Promise<Car[]> {
    if (name) {
      return this.repository.find({
        where: {
          name: name,
          available: true,
        },
      });
    }

    if (available) {
      return this.repository.find({
        where: {
          available: available,
        },
      });
    }

    if (category_id) {
      return this.repository.find({
        where: {
          category_id: category_id,
          available: true,
        },
      });
    }

    if (brand) {
      return this.repository.find({
        where: {
          brand: brand,
          available: true,
        },
      });
    }

    return await this.repository.find({
      where: {
        available: true,
      },
    });
  }

  async create({
    name,
    available,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      available,
      daily_rate,
      description,
      fine_amount,
      license_place,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }
}
