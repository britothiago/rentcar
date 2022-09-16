import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

interface IRequest {
  id_user: string;
}

@injectable()
export class DevolutionCarRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarsRepository")
    private carRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id_user }: IRequest): Promise<void> {
    const devolutionDate = new Date();
    const myRental = await this.rentalRepository.findByUserId(id_user);
    const diffDaysToStart = this.dateProvider.compareDateIfSameDays(
      myRental.start_date,
      devolutionDate
    );
    if (diffDaysToStart >= 0)
      throw new AppError("Cannot make a devolution of a car before to get it");

    const diffDaysToReturn = this.dateProvider.compareDateIfSameDays(
      myRental.expect_return_date,
      devolutionDate
    );

    if (diffDaysToReturn === 0) {
      await this.rentalRepository.finishedRentalCar(
        myRental.user_id,
        myRental.expect_return_date,
        devolutionDate,
        myRental.total
      );
      await this.carRepository.updateAvailableStatusCar(myRental.car_id, true);
    }

    if (diffDaysToReturn > 0) {
      const diffHours = this.dateProvider.compareInHours(
        devolutionDate,
        myRental.expect_return_date
      );
      if (diffHours > 24) {
        const car = await this.carRepository.findById(myRental.car_id);
        await this.rentalRepository.finishedRentalCar(
          myRental.user_id,
          myRental.expect_return_date,
          devolutionDate,
          myRental.total - car.daily_rate
        );
        await this.carRepository.updateAvailableStatusCar(
          myRental.car_id,
          true
        );
      } else if (diffHours < 0) {
        const car = await this.carRepository.findById(myRental.car_id);
        await this.rentalRepository.finishedRentalCar(
          myRental.user_id,
          myRental.expect_return_date,
          devolutionDate,
          myRental.total + car.fine_amount
        );
        await this.carRepository.updateAvailableStatusCar(
          myRental.car_id,
          true
        );
      }
    }
  }
}
