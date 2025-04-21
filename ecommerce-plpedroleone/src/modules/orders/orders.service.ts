import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createOrder(userId: string, productsIds: (string | undefined)[]) {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      productsIds.map(async (productId) => {
        const product = await this.productsRepository.findOneBy({
          id: productId,
        });

        if (!product || product.stock === 0) {
          throw new NotFoundException('Product not found or depleted');
        }

        total += Number(product.price);

        await this.productsRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetail: true,
      },
    });
  }

  async getOrderById(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }
}
