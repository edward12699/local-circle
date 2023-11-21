// dtos/upload-file-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';
// import { IsString, IsNotEmpty } from 'class-validator';

@ObjectType()
export class UploadFileResponseDTO {
  @Field()
  filename!: string;

  @Field()
  url!: string;
}
