import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../../data.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories() {
    await Promise.all(
      data?.map(async (element) => {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: element.category })
          .orIgnore()
          .execute();
      }),
    );

    return 'Categories added';
  }

  async getAllCategories() {
    return await this.categoriesRepository.find();
  }
}
