import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/createCarUseCase";
import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;
let createCarUseCase: CreateCarUseCase;
describe("List all available cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  test("should be able to list all available cars", async () => {
    await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({});

    return expect(cars).toHaveLength;
  });

  test("should be able to list all available cars by car name", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({
      name: car.name,
    });

    return expect(cars).toHaveLength;
  });

  test("should be able to list all available cars by car brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({
      brand: car.brand,
    });

    return expect(cars).toHaveLength;
  });

  test("should be able to list all available cars by category id", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    return expect(cars).toHaveLength;
  });

  test("should not be able to list unavailable cars by category id", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      available: false,
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    return expect(cars).not.toHaveLength;
  });

  test("should be able to list unavailable cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      available: false,
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const cars = await listCarsUseCase.execute({
      available: false,
    });

    return expect(cars).toHaveLength;
  });
});
