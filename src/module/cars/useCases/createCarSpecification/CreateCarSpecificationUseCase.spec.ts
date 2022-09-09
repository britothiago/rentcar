import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/createCarUseCase";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory
    );
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  test("should not be able to add a new specification to the inexistent car", async () => {
    return expect(async () => {
      const specificationList = await createSpecificationUseCase.execute({
        name: "Rodas",
        description: "Rodas de liga leve",
      });
      await createCarSpecificationUseCase.execute({
        car_id: "123",
        specifications_id: [specificationList],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should be able to add a new specification to the car", async () => {
    const car = await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    });

    const specificationList = await specificationRepositoryInMemory.create({
      name: "Rodas",
      description: "Rodas de liga leve",
    });

    const specifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specificationList],
    });

    return expect(specifications.specifications).toHaveLength;
  });
});
