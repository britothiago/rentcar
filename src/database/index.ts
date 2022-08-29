import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: "docker",
  password: "ignite",
  database: "rentcar",
});

AppDataSource.initialize();
