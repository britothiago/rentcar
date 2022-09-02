import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatarUrl, userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    user.avatar = avatarUrl;
    await this.usersRepository.create(user);
    return user;
  }
}
