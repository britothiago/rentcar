import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/providers/MailProvider/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

@injectable()
export class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("User not found", 401);

    const token = uuid();
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dayjsDateProvider.addMin(15),
    });

    await this.etherealMailProvider.sendMail(
      email,
      "Recuperação de Senha",
      `O link para o reset é ${token}`
    );
  }
}
