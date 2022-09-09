import { CarImage } from "../entities/CarImage";

interface IRequest {
  car_id: string;
  image_name: string;
}
export interface ICarsImagesRepository {
  create({ car_id, image_name }: IRequest): Promise<CarImage>;
}
