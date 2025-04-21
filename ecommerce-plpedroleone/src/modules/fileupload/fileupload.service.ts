import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './fileupload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepoitory: Repository<Products>,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}

  async uploadProductImage(id: string, image: Express.Multer.File) {
    const product = await this.productsRepoitory.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadImage =
      await this.fileUploadRepository.uploadProductImage(image);

    await this.productsRepoitory.update(product.id, {
      imgUrl: uploadImage.secure_url,
    });

    return 'Producto actualizado con exito';
  }
}
