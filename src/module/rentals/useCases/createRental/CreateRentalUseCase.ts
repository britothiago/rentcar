import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  start_date: Date;
  expect_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    expect_return_date,
    start_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const getDateDifferenceInHours = this.dateProvider.compareInHours(
      new Date(),
      start_date
    );

    if (getDateDifferenceInHours < 24) {
      throw new AppError(
        `Start date must be 24 hours higher the actual date and ${getDateDifferenceInHours} is not valid`
      );
    }

    const getDateDifferenceInHoursBetweenStartAndEndDate =
      this.dateProvider.compareInHours(start_date, expect_return_date);
    if (getDateDifferenceInHoursBetweenStartAndEndDate < 48) {
      throw new AppError(
        `Expected date must be 48 hours higher the started date and ${getDateDifferenceInHoursBetweenStartAndEndDate} is not valid`
      );
    }

    const isCarRentalExists = await this.rentalRepository.findByOpenRentalToCar(
      car_id
    );

    if (isCarRentalExists) {
      throw new AppError("Already exists a rental for this car");
    }

    const isUserAlreadyRentAnotherCar =
      await this.rentalRepository.findByOpenRentalToUser(user_id);

    if (isUserAlreadyRentAnotherCar) {
      throw new AppError("Already exists a rental for this user");
    }

    const car = await this.carsRepository.findById(car_id);

    const totalDays = this.dateProvider.compareDateIfSameDays(
      expect_return_date,
      start_date
    );

    const rental = await this.rentalRepository.create({
      car_id,
      expect_return_date,
      start_date,
      total: car.daily_rate * totalDays,
      user_id,
    });

    this.carsRepository.updateAvailableStatusCar(car_id, false);

    return rental;
  }
}
