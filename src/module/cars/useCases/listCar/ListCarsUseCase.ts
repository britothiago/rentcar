import { inject, injectable } from "tsyringe";
import { Car } from "../../entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("cars")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return await this.carsRepository.list();
  }
}
