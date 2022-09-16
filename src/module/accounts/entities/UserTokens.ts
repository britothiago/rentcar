import { v4 as uuid } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@Entity("users_token")
export class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.id ? this.id : (this.id = uuid());
  }
}
