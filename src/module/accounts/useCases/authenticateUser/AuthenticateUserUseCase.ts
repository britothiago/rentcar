import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { UserTokens } from "../../entities/UserTokens";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

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
  userTokenRefresh: UserTokens;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IUserCallback> {
    const isUserExists = await this.usersRepository.findByEmail(email);
    if (isUserExists) {
      const passwordMatch = await compare(password, isUserExists.password);
      if (!passwordMatch) {
        throw new AppError("Email or password incorrect");
      } else {
        const token = sign({}, process.env.SECRET_KEY_TOKEN, {
          subject: isUserExists.id,
          expiresIn: process.env.EXPIRES_IN_TOKEN,
        });

        const refreshToken = sign(
          {
            email,
          },
          process.env.REFRESH_TOKEN_KEY,
          {
            subject: isUserExists.id,
            expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
          }
        );

        const userTokenRefresh = await this.usersTokenRepository.create({
          expires_date: this.dayjsDateProvider.addDays(
            Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS)
          ),
          refresh_token: refreshToken,
          user_id: isUserExists.id,
        });

        return {
          user: {
            name: isUserExists.name,
            email: isUserExists.email,
          },
          token,
          userTokenRefresh,
        };
      }
    } else {
      throw new AppError("Email or password incorrect");
    }
  }
}
