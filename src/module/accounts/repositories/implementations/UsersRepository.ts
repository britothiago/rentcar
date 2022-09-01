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

  async findByName(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
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
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
    });
    await this.repository.save(user);
    return user;
  }
}
