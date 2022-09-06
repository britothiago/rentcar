import { Car } from "../entities/Car";

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_place: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export interface ICarsRepository {
  findByLicensePlate(license_place: string): Promise<Car>;
  list(): Promise<Car[]>;
  create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
  }: ICreateCarDTO): Promise<Car>;
}
