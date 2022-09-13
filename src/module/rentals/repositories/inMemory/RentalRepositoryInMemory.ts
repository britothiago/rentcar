import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../IRentalRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  start_date: Date;
  expect_return_date: Date;
  total: number;
  end_date: Date;
}

export class RentalRepositoryInMemory implements IRentalRepository {
  rental: Rental[];

  constructor() {
    this.rental = [];
  }

  async findByOpenRentalToUser(id: string): Promise<Rental> {
    return this.rental.find(
      (rental) => rental.user_id === id && !rental.end_date
    );
  }

  async findByOpenRentalToCar(id: string): Promise<Rental> {
    return this.rental.find(
      (rental) => rental.car_id === id && !rental.end_date
    );
  }

  async create({
    car_id,
    expect_return_date,
    start_date,
    total,
    user_id,
    end_date = null,
  }: IRequest): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      expect_return_date,
      start_date,
      total,
      user_id,
      end_date,
    });
    this.rental.push(rental);
    return rental;
  }
}
