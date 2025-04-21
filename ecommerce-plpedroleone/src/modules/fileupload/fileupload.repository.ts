import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class FileUploadRepository {
  async uploadProductImage(
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
              if (result) {
                resolve(result);
              } else {
                reject(new Error('Upload result is undefined'));
              }
          }
        },
      );

      toStream(image.buffer).pipe(upload);
    });
  }
}
