import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IDateProvider } from "../../../shared/providers/DateProvider/IDateProvider";
import { Rental } from "../entities/Rental";
import { IRentalRepository } from "../repositories/IRentalRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  start_date: Date;
  expect_return_date: Date;
  total: number;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    //@inject()
    private rentalRepository: IRentalRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    expect_return_date,
    start_date,
    total,
    user_id,
  }: IRequest): Promise<Rental> {
    const getDateDifferenceInHours = this.dateProvider.compareInHours(
      new Date(),
      start_date
    );

    if (getDateDifferenceInHours < 24)
      throw new AppError("Start date must be 24 hours higher the actual date");

    const isCarRentalExists = await this.rentalRepository.findByOpenRentalToCar(
      car_id
    );

    if (isCarRentalExists)
      throw new AppError("Already exists a rental for this car");

    const isUserAlreadyRentAnotherCar =
      await this.rentalRepository.findByOpenRentalToUser(user_id);

    if (isUserAlreadyRentAnotherCar) {
      throw new AppError("Already exists a rental for this user");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      expect_return_date,
      start_date,
      total,
      user_id,
    });
    return rental;
  }
}
