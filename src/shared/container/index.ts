import { container } from "tsyringe";
import { UsersRepository } from "../../module/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../module/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "../../module/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../module/cars/repositories/ICategoriesRepository";
import { CarsRepository } from "../../module/cars/repositories/implementarions/CarsRepository";
import { CategoriesRepository } from "../../module/cars/repositories/implementarions/CategoriesRepository";
import { SpecificationRepository } from "../../module/cars/repositories/implementarions/SpecificationsRepository";
import { ISpecificationRepository } from "../../module/cars/repositories/ISpeciticationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
