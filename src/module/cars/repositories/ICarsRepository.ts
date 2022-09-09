import { Car } from "../entities/Car";
import { Specification } from "../entities/Specification";
export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_place: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;
  specifications?: Specification[];
  id?: string;
}

interface ICreateCarOptionalDTO {
  category_id?: string;
  brand?: string;
  name?: string;
  available?: boolean;
}

export interface ICarsRepository {
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_place: string): Promise<Car>;
  list({
    brand,
    category_id,
    name,
    available,
  }: ICreateCarOptionalDTO): Promise<Car[]>;
  create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    specifications,
  }: ICreateCarDTO): Promise<Car>;
}
