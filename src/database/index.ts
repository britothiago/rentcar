import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../module/accounts/entities/User";
import { Car } from "../module/cars/entities/Car";
import { CarImage } from "../module/cars/entities/CarImage";
import { Category } from "../module/cars/entities/Category";
import { Specification } from "../module/cars/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: "docker",
  password: "ignite",
  database: "rentcar",
  entities: [Category, Specification, User, Car, CarImage],
  migrations: ["./src/database/migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
