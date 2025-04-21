import { Module } from '@nestjs/common';
import { FileUploadService } from './fileupload.service';
import { FileUploadController } from './fileupload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './fileupload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileuploadModule {}
