import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import request from "supertest";
import { app } from "../../../../app";
import { AppDataSource } from "../../../../database";
import { User } from "../../../accounts/entities/User";

describe("create category controller", () => {
  const query = AppDataSource.initialize();

  beforeAll(async () => {
    const password = await hash("admin", 8);
    (await query).runMigrations();

    (await query)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid(),
          name: "William Doe",
          driver_license: "23456",
          isAdmin: true,
          password,
          email: "william@test.com",
          created_at: new Date(),
        },
      ])
      .execute();
  });

  afterAll(async () => {
    (await query).dropDatabase();
    (await query).destroy();
  });

  it("test category controller", async () => {
    const response = await request(app).post("/auth").send({
      email: "william@test.com",
      password: "admin",
    });

    const category = await request(app)
      .post("/categories")
      .send({
        name: "Category test",
        description: "Category test",
      })
      .set({
        Authorization: `Bearer ${response.body.token}`,
      });

    expect(category.status).toBe(201);
  });
});
