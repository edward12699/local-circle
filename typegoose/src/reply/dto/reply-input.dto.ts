import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';




@InputType('ReplyInput')
export class ReplyInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: Array<string>;

  @IsDate()
  @Field({})
  createdAt?: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  post!: Types.ObjectId;

}
