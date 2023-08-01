import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cart {
  @PrimaryColumn()
  username: string;

  @Column()
  carts: string;
}
