import { AppDataSource } from "..";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import { User } from "../../module/accounts/entities/User";

async function create() {
  const password = await hash("admin", 8);
  const created_at = new Date();
  const id = uuid();

  const query = AppDataSource.initialize();
  (await query)
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        id,
        name: "William Doe",
        driver_license: "23456",
        isAdmin: true,
        password,
        email: "william@test.com",
        created_at,
      },
    ])
    .execute();
  (await query).destroy();

  // it works also

  // await queryRunner.connect();
  // const users = await queryRunner.query("SELECT * FROM users");
  // console.log(users);
  // await queryRunner.release();
}

create().then(() => console.log("User admin created"));
