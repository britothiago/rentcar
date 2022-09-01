import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

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
    if (!(await this.userRepository.findByEmail(email))) {
      const hashedPassword = await hash(password, 8);
      const user = await this.userRepository.create({
        driver_license,
        email,
        name,
        password: hashedPassword,
      });
      return user;
    }
    throw new AppError("User already exists");
  }
}
