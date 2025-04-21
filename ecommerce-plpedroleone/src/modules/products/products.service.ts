import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import * as data from '../../data.json';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/category.entity';
import { UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data?.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) throw new Error('error');
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Products added';
  }

  async getAllProducts(page: number, limit: number) {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;

    products = products.slice(start, end);

    return products;
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async updateProduct(
    id: string,
    updatedProductDto: UpdateProductDto,
  ): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id: id });
    if (!product) throw new NotFoundException('Product not found');

    if (updatedProductDto.category) {
      let category = await this.categoriesRepository.findOne({
        where: { name: updatedProductDto.category },
      });

      if (!category) {
        category = this.categoriesRepository.create({
          name: updatedProductDto.category,
        });

        category = await this.categoriesRepository.save(category);
      }

      await this.productsRepository.update(id, {
        ...product,
        ...updatedProductDto,
        category: category,
      });
    } else {
      await this.productsRepository.update(id, {
        ...product,
        ...updatedProductDto,
        category: product.category,
      });
    }

    return 'Product Updated';
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) throw new NotFoundException('Product not found');

    await this.productsRepository.delete(id);

    return 'Product deleted';
  }
}
