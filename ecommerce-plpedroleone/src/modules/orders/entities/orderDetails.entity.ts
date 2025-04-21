import { Products } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity({
  name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Products, (products) => products.orderDetails)
  @JoinTable({
    name: 'ORDER_DETAILS_PRODUCTS',
  })
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
