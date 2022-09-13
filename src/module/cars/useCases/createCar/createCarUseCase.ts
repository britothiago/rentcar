import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_place: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    available = true,
    license_place,
    name,
  }: IRequest): Promise<Car> {
    const isCarsExists = await this.carsRepository.findByLicensePlate(
      license_place
    );
    if (!isCarsExists) {
      const car = await this.carsRepository.create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        available,
        license_place,
        name,
      });
      return car;
    }
    throw new AppError("This license plate already exists");
  }
}
