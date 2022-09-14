import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class EditEndDateIsNullableRentalsTable1663122291055
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "rentals",
      "end_date",
      new TableColumn({
        name: "end_date",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "rentals",
      "end_date",
      new TableColumn({
        name: "end_date",
        type: "timestamp",
      })
    );
  }
}
