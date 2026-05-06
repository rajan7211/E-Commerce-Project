import { UserRole } from "../utils/enums";

import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, OneToOne,
  CreateDateColumn, UpdateDateColumn
} from "typeorm";

import { Address } from "./Address";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Store } from "./Store";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column()
  user_pass: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}











