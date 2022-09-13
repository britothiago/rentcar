import { Rental } from "../entities/Rental";

interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  start_date: Date;
  expect_return_date: Date;
  total: number;
}

export interface IRentalRepository {
  findByUser(id: string): Promise<Rental>;
  findByCar(id: string): Promise<Rental>;
  create({
    car_id,
    expect_return_date,
    start_date,
    total,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
}
