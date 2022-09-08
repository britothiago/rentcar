import { Car } from "../../entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";
interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
  available?: boolean;
}
export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[];

  constructor() {
    this.cars = [];
  }

  async listByCategory(category_id: string): Promise<Car[]> {
    return this.cars.filter(
      (car) => car.available && car.category_id === category_id
    );
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findByLicensePlate(license_place: string): Promise<Car> {
    return this.cars.find((car) => car.license_place === license_place);
  }

  async list({
    available,
    brand,
    category_id,
    name,
  }: IRequest): Promise<Car[]> {
    if (available) return this.cars.filter((car) => car.available);
    if (brand)
      return this.cars.filter((car) => car.available && car.brand === brand);
    if (category_id)
      return this.cars.filter(
        (car) => car.available && car.category_id === category_id
      );
    if (name)
      return this.cars.filter((car) => car.available && car.name === name);

    return this.cars.filter((car) => car.available);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    available,
    fine_amount,
    license_place,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      available,
      description,
      fine_amount,
      license_place,
    });
    this.cars.push(car);
    return car;
  }
}
