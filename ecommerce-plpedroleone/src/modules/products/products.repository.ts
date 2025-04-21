// import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/products.dto';
// import { UpdateProductDto } from './dto/updateProductDto';
// import { Repository } from 'typeorm';
// import { Products } from './entities/product.entity';
// import * as data from '../../data.json';
// import { InjectRepository } from '@nestjs/typeorm';

// export interface Product {
//   id?: number;
//   name?: string;
//   description?: string;
//   price?: number;
//   stock?: boolean;
//   imgUrl?: string;
// }

// @Injectable()
// export class ProductsRepository {
//   constructor(
//     @InjectRepository(Products)
//     private productsRepository: Repository<Products>,
//   ) {}
//   private products: Product[] = [
//     {
//       id: 1,
//       name: 'Zapatos',
//       description: 'Zapatos marrones',
//       price: 45.0,
//       stock: true,
//       imgUrl:
//         'https://http2.mlstatic.com/D_NQ_NP_878665-MLA41330239952_042020-O.webp',
//     },
//     {
//       id: 2,
//       name: 'Pantalon',
//       description: 'Pantalon de jean',
//       price: 55.0,
//       stock: true,
//       imgUrl:
//         'https://acdn.mitiendanube.com/stores/001/031/712/products/jean-cargo-alfonsina-1-31-518ba41b4ad02a004116917601269508-1024-1024.png',
//     },
//     {
//       id: 3,
//       name: 'Campera',
//       description: 'Campera de gavardina verde',
//       price: 105.0,
//       stock: true,
//       imgUrl:
//         'https://dcdn.mitiendanube.com/stores/001/808/668/products/chaqueta-verde-8f97e69ecdac0fa8f316875487231963-640-0.png',
//     },
//     {
//       id: 4,
//       name: 'Remera lisa',
//       description: 'Remeras lisas de varios colores',
//       price: 25.0,
//       stock: true,
//       imgUrl:
//         'https://http2.mlstatic.com/D_NQ_NP_847909-MLA70154722766_062023-O.webp',
//     },
//   ];

//   getAllProducts(page: number, limit: number): Product[] {
//     const start = (page - 1) * limit;
//     const end = start + limit;

//     if (!page || !limit) {
//       return this.products.slice(0, 4);
//     }

//     return this.products.slice(start, end);
//   }

//   getProductById(id: number): Product | undefined {
//     return this.products.find((product) => product.id === id);
//   }

//   createProduct(product: CreateProductDto): number {
//     const id = this.products.length + 1;
//     product.id = id;

//     this.products.push(product);
//     return id;
//   }

//   updateProduct(id: number, product: UpdateProductDto): number {
//     const findProduct = this.products.find((product) => product.id === id);
//     const updatedProduct = { ...findProduct, ...product };

//     const index = this.products.findIndex((product) => product.id === id);
//     this.products[index] = updatedProduct;

//     return id;
//   }

//   deleteProduct(id: number): number {
//     const deleteProduct = this.products.filter((product) => product.id !== id);
//     this.products = deleteProduct;
//     return id;
//   }
// }
