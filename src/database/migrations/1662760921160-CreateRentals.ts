import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRentals1662760921160 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "car_id", type: "uuid" },
          { name: "user_id", type: "uuid" },
          { name: "start_date", type: "timestamp", default: "now()" },
          { name: "end_date", type: "timestamp" },
          { name: "expect_return_date", type: "timestamp" },
          { name: "total", type: "numeric" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    ),
      await queryRunner.createForeignKey(
        "rentals",
        new TableForeignKey({
          name: "FKCarId",
          referencedTableName: "cars",
          referencedColumnNames: ["id"],
          columnNames: ["car_id"],
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        })
      ),
      await queryRunner.createForeignKey(
        "rentals",
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
    await queryRunner.dropForeignKey("rentals", "FKUserId");
    await queryRunner.dropForeignKey("rentals", "FKCarId");
    await queryRunner.dropTable("rentals");
  }
}
