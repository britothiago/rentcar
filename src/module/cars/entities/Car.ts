import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_place: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  available?: boolean;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    this.id ? this.id : (this.id = uuid());
    this.created_at ? this.created_at : (this.created_at = new Date());
    this.available ? this.available : (this.available = true);
  }
}
