import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { UserTokens } from "../../entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

interface IRequest {
  expires_date: Date;
  refresh_token: string;
  user_id: string;
}

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async deleteTokenById(user_id: string): Promise<void> {
    await this.repository.delete(user_id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refreshToken: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({
      where: { user_id, refresh_token: refreshToken },
    });
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IRequest): Promise<UserTokens> {
    const userTokens = new UserTokens();
    Object.assign(userTokens, {
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userTokens);
    return userTokens;
  }
}
