import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  findByName(username: string): Promise<User>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
}
