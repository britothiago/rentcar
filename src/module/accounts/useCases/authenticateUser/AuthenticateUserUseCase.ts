import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IUserCallback {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IUserCallback> {
    const isUserExists = await this.usersRepository.findByEmail(email);
    if (isUserExists) {
      const passwordMatch = await compare(password, isUserExists.password);
      if (!passwordMatch) {
        throw new AppError("Email or password incorrect");
      } else {
        const token = sign({}, "aca8698eac2050efa48cc339caad3989", {
          subject: isUserExists.id,
          expiresIn: "1d",
        });

        return {
          user: {
            name: isUserExists.name,
            email: isUserExists.email,
          },
          token,
        };
      }
    }
    throw new AppError("Email or password incorrect");
  }
}
