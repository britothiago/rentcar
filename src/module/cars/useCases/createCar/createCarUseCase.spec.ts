import { rejects } from "assert";
import { AppError } from "../../../../errors/AppError";
import { Car } from "../../entities/Car";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("create a new car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  test("should be able create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    return expect(car).toHaveProperty("id");
  });

  test("should't be able create a car with license plate already created", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    return expect(async () => {
      await createCarUseCase.execute({
        name: "Honda FIT",
        description: "Honda FIT 2008 automático",
        daily_rate: 100,
        license_place: "ABC12D4",
        fine_amount: 130,
        brand: "Honda",
        category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should be able create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    return expect(car.available).toBe(true);
  });
});
