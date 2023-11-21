// services/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';
import Upload from 'graphql-upload/Upload.mjs';

@Injectable()
export class FileUploadService {
  private readonly client: OSS;

  constructor(private configService: ConfigService) {
    this.client = new OSS({
      region: this.configService.get('REGION'),
      accessKeyId: this.configService.get('ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('SECRET_ACCESS_KEY'),
      bucket: this.configService.get('OSS_BUCKET'),
    });
  }

  async uploadFile(file: any): Promise<OSS.PutObjectResult> {
    const stream = file.createReadStream();
    const result = await this.client.put(file.filename, stream);
    return {
      filename: file.filename,
      url: result.url,
    };
  }
}
