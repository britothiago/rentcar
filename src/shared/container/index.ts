import { container } from "tsyringe";
import { UsersRepository } from "../../module/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../module/accounts/repositories/IUsersRepository";
import { ICarsImagesRepository } from "../../module/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../module/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../module/cars/repositories/ICategoriesRepository";
import { CarsImagesRepository } from "../../module/cars/repositories/implementations/CarsImagesRepository";
import { CarsRepository } from "../../module/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "../../module/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../module/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../module/cars/repositories/ISpecificationsRepository";
import { RentalRepository } from "../../module/rentals/repositories/implementations/RentalRepository";
import { IRentalRepository } from "../../module/rentals/repositories/IRentalRepository";
import { IDateProvider } from "../providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";

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

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
