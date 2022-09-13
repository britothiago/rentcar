import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[];
  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async create({
    driver_license,
    email,
    name,
    password,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
      avatar,
    });

    this.users.push(user);

    return user;
  }
}
