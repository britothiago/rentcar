import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Specification } from "../../entities/Specification";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: Specification[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const isExistsCar = await this.carsRepository.findById(car_id);

    if (isExistsCar) {
      const specifications = await this.specificationRepository.findByIds(
        specifications_id
      );

      isExistsCar.specifications = specifications;
      return await this.carsRepository.create(isExistsCar);
    }

    throw new AppError("Car does not exist");
  }
}
