import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCarImages1662740814317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_image",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
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
        "cars_image",
        new TableForeignKey({
          name: "FKCarId",
          referencedTableName: "cars",
          referencedColumnNames: ["id"],
          columnNames: ["car_id"],
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("cars_image", "FKCardId");
    await queryRunner.dropTable("cars_image");
  }
}
