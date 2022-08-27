import { v4 as uuid } from "uuid";

export class Specification {
  id?: string;
  name: string;
  description: string;
  created_At?: Date;

  constructor() {
    this.id ? this.id : (this.id = uuid());
    this.created_At ? this.created_At : (this.created_At = new Date());
  }
}
