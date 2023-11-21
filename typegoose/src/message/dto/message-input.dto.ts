import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';
import { _ContentType } from '../message.entity'


@InputType('MessageInput')
export class MessageInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  sender!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  contentType!: _ContentType;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  content!: string;

  @IsDate()
  @Field({})
  timestamp!: Date;
}
