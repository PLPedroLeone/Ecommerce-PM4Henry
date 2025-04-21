import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProductDto } from './dto/products.dto';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get()
  getAllProducts(@Query('page') page?: number, @Query('limit') limit?: number) {
    if (page && limit) {
      return this.productsService.getAllProducts(page, limit);
    }

    return this.productsService.getAllProducts(1, 5);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id') id: string,
    @Body() updatedProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updatedProductDto);
  }

  @ApiBearerAuth()
  @Delete()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
