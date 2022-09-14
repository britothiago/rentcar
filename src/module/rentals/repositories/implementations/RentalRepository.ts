import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
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

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async findByOpenRentalToUser(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id: id } });
  }

  async findByOpenRentalToCar(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id: id } });
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

    await this.repository.save(rental);
    return rental;
  }
}
