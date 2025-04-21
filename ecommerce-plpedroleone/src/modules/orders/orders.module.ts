import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from '../products/entities/product.entity';
import { Users } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
