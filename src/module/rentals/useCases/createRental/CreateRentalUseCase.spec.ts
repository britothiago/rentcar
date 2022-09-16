import dayjs from "dayjs";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/inMemory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("create a new rental", () => {
  const START_DATE_HOUR = dayjs().add(2, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  test("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "123",
      expect_return_date: new Date("2022-10-19 17:30"),
      start_date: START_DATE_HOUR,
      total: 100,
      user_id: "123",
    });

    return expect(rental).toHaveProperty("id");
  });

  test("should be not able to create a new rental for an existent rental car", async () => {
    await createRentalUseCase.execute({
      car_id: "123",
      expect_return_date: new Date("2022-10-19 17:30"),
      start_date: START_DATE_HOUR,
      total: 100,
      user_id: "123",
    });

    return expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123",
        expect_return_date: new Date(),
        start_date: START_DATE_HOUR,
        total: 110,
        user_id: "124",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should be not able to create a new rental for an existent rental user", async () => {
    await createRentalUseCase.execute({
      car_id: "123",
      expect_return_date: new Date("2022-10-19 17:30"),
      start_date: START_DATE_HOUR,
      total: 100,
      user_id: "123",
    });

    return expect(async () => {
      await createRentalUseCase.execute({
        car_id: "124",
        expect_return_date: new Date("2022-10-19 17:30"),
        start_date: START_DATE_HOUR,
        total: 110,
        user_id: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should be not able to create a new rental with minimum start date time", async () => {
    return expect(async () => {
      await createRentalUseCase.execute({
        car_id: "124",
        expect_return_date: new Date("2022-10-19 17:30"),
        start_date: new Date("2022-09-13 17:30"),
        total: 110,
        user_id: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
