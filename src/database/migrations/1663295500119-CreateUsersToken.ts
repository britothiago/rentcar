import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUsersToken1663295500119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_token",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "refresh_token",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "expires_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    ),
      await queryRunner.createForeignKey(
        "users_token",
        new TableForeignKey({
          name: "FKUserId",
          referencedTableName: "users",
          referencedColumnNames: ["id"],
          columnNames: ["user_id"],
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users_token", "FKUserId");
    await queryRunner.dropTable("users_token");
  }
}
