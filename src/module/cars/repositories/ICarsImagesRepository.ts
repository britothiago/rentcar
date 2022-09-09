import { CarImage } from "../entities/CarImage";

export interface ICarsImagesRepository {
  create(id: string, image_name: string): Promise<CarImage>;
}
