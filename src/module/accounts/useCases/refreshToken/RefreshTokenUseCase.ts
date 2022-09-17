import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string) {
    const decode = verify(token, process.env.REFRESH_TOKEN_KEY) as IPayload;

    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        decode.sub,
        token
      );

    if (!userToken) throw new AppError("Refresh token doesn't exists");

    await this.usersTokenRepository.deleteTokenById(userToken.id);

    const newUserToken = sign(
      { email: decode.email },
      process.env.REFRESH_TOKEN_KEY,
      {
        subject: userToken.user_id,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
      }
    );

    const userTokenRefresh = await this.usersTokenRepository.create({
      expires_date: this.dayjsDateProvider.addDays(
        Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS)
      ),
      refresh_token: newUserToken,
      user_id: userToken.user_id,
    });

    return userTokenRefresh;
  }
}
