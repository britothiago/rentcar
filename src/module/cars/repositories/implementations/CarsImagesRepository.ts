import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { CarImage } from "../../entities/CarImage";
import { ICarsImagesRepository } from "../ICarsImagesRepository";

interface ICreateCarImageDTO {
  car_id: string;
  image_name: string;
}
export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage, {
      car_id,
      image_name,
    });

    await this.repository.save(carImage);
    return carImage;
  }
}
