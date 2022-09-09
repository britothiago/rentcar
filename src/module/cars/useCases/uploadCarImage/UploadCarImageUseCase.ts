import { inject, injectable } from "tsyringe";
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

  async execute({ id, image_name }: IRequest): Promise<void> {
    console.log(
      "🚀 ~ file: UploadCarImageUseCase.ts ~ line 17 ~ UploadCarImageUseCase ~ execute ~ image_name",
      image_name
    );

    image_name.map(
      async (image) => await this.carsImagesRepository.create(id, image)
    );
  }
}
