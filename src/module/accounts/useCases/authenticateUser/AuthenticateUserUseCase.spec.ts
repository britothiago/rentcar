import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate user by email and password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  test("should be get token with email and password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "john.doe@test.com",
      name: "John Doe",
      password: "123",
    };

    await createUserUseCase.execute({
      driver_license: user.driver_license,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    return expect(token).toHaveProperty("token");
  });

  test("should be failed with invalid password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "john.doe@test.com",
      name: "John Doe",
      password: "123",
    };

    await createUserUseCase.execute({
      driver_license: user.driver_license,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    return expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongEmail",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test("should be failed with invalid email", async () => {
    return expect(async () => {
      await authenticateUserUseCase.execute({
        email: "123@test.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
