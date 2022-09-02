import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async list(): Promise<User[]> {
    return await this.repository.find();
  }

  async create({
    driver_license,
    email,
    name,
    password,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
      avatar,
    });
    await this.repository.save(user);
    return user;
  }
}
