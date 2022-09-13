import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../accounts/entities/User";
import { Car } from "../../cars/entities/Car";

@Entity("rentals")
export class Rental {
  @PrimaryColumn()
  id?: string;

  @OneToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  car_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date?: Date;

  @Column()
  expect_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    this.id ? this.id : (this.id = uuid());
    this.created_at ? this.created_at : (this.created_at = new Date());
  }
}
