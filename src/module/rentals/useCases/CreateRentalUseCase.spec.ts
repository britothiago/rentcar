import { UsersRepositoryInMemory } from "../../accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../accounts/useCases/createUser/CreateUserUseCase";
import { CarsRepositoryInMemory } from "../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../../cars/useCases/createCar/createCarUseCase";
import { RentalRepositoryInMemory } from "../repositories/inMemory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
}

interface ICarResponse {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_place: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;
}

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("create a new rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  test("should be able to create a new rental", async () => {
    const user = (await createUserUseCase.execute({
      driver_license: "1234",
      email: "john.doe@test.com",
      name: "John Doe",
      password: "123",
    })) as IUserResponse;
    console.log(
      "🚀 ~ file: CreateRentalUseCase.spec.ts ~ line 53 ~ test ~ user",
      user
    );

    const car = (await createCarUseCase.execute({
      name: "Honda FIT",
      description: "Honda FIT 2008 automático",
      daily_rate: 100,
      license_place: "ABC12D4",
      fine_amount: 130,
      brand: "Honda",
      category_id: "670bd10c-f30e-4f42-af93-9f1a8e696045",
    })) as ICarResponse;
    console.log(
      "🚀 ~ file: CreateRentalUseCase.spec.ts ~ line 64 ~ test ~ car",
      car
    );

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expect_return_date: new Date(),
      start_date: new Date(),
      total: 100,
      user_id: user.id,
    });

    console.log(rental);

    return expect(rental).toHaveProperty("id");
  });
});
