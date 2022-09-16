import { Rental } from "../entities/Rental";

interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  start_date: Date;
  expect_return_date: Date;
  total: number;
}

export interface IRentalRepository {
  findByOpenRentalToUser(id: string): Promise<Rental>;
  findByOpenRentalToCar(id: string): Promise<Rental>;
  create({
    car_id,
    expect_return_date,
    start_date,
    total,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
  finishedRentalCar(
    user_id: string,
    expected_return_date: Date,
    end_date: Date,
    total: number
  ): Promise<void>;
  findByUserId(user_id: string): Promise<Rental>;
}
