// resolvers/file-upload.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileResponseDTO } from './dto/file-upload-response.dto';
import { FileUploadService } from './file-upload.service';
let GraphQLUpload;
let Upload;


async function loadModule() {
  GraphQLUpload = await import('graphql-upload/GraphQLUpload.mjs');
  Upload = await import('graphql-upload/Upload.mjs');
}
loadModule()


@Resolver()
export class FileUploadResolver {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Mutation(() => UploadFileResponseDTO)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: typeof Upload) {
    const uploadResult = await this.fileUploadService.uploadFile(file);
    return {
      filename: file.file && file.file.filename,
      url: uploadResult.url,
    };
  }
}
