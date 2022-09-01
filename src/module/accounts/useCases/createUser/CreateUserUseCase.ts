import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IError {
  message: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    driver_license,
    email,
    name,
    password,
  }: IRequest): Promise<User | IError> {
    if (!(await this.userRepository.findByName(email))) {
      const user = await this.userRepository.create({
        driver_license,
        email,
        name,
        password,
      });
      return user;
    }
    return {
      message: "User already exists",
    };
  }
}