import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createOrder(@Body() orderDto: CreateOrderDto) {
    const { userId, products } = orderDto;
    const productsIds = products.map((obj) => {
      const productId = obj.id;
      return productId;
    });
    return this.ordersService.createOrder(userId, productsIds);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
