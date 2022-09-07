import { inject, injectable } from "tsyringe";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
  available?: boolean;
}
@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("cars")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    name,
    available,
  }: IRequest): Promise<Car[]> {
    return await this.carsRepository.list({
      brand,
      category_id,
      name,
      available,
    });
  }
}
