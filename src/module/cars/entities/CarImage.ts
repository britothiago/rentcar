import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("cars_image")
export class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    this.id ? this.id : (this.id = uuid());
    this.created_at ? this.created_at : (this.created_at = new Date());
  }
}
