import { inject, injectable } from "tsyringe";
import { CarImage } from "../../entities/CarImage";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  id: string;
  image_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ id, image_name }: IRequest) {
    const cars = image_name.map(
      async (image) =>
        await this.carsImagesRepository.create({
          car_id: id,
          image_name: image,
        })
    );

    return cars;
  }
}
