import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async findByLicensePlate(license_place: string): Promise<Car> {
    return await this.repository.findOne({ where: { license_place } });
  }

  async list(): Promise<Car[]> {
    return await this.repository.find();
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
    });
    await this.repository.save(car);
    return car;
  }
}
