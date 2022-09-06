import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[];

  constructor() {
    this.cars = [];
  }

  async findByLicensePlate(license_place: string): Promise<Car> {
    return this.cars.find((car) => car.license_place === license_place);
  }

  async list(): Promise<Car[]> {
    return this.cars;
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
    this.cars.push(car);
    return car;
  }
}
