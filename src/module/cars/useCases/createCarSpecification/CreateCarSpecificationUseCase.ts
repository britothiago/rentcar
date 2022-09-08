import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const isExistsCar = await this.carsRepository.findById(car_id);
    if (isExistsCar) {
      //
    }
    throw new AppError("Car does not exist");
  }
}
