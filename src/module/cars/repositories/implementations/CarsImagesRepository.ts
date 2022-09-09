import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { CarImage } from "../../entities/CarImage";
import { ICarsImagesRepository } from "../ICarsImagesRepository";

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id: id,
      image_name,
    });
    await this.repository.save(carImage);
    return carImage;
  }
}
