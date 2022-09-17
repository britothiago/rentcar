import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../module/accounts/entities/User";
import { UserTokens } from "../module/accounts/entities/UserTokens";
import { Car } from "../module/cars/entities/Car";
import { CarImage } from "../module/cars/entities/CarImage";
import { Category } from "../module/cars/entities/Category";
import { Specification } from "../module/cars/entities/Specification";
import { Rental } from "../module/rentals/entities/Rental";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentcar_qa" : "rentcar",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  migrations: ["./src/database/migrations/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source ${process.env.NODE_ENV} has been initialized!`);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
