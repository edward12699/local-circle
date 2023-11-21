import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';


@InputType('ChatroomUpdate')
export class ChatroomUpdateDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @Field({ nullable: false })
  name?: string;

  @IsString()
  @Field({ nullable: false })
  description?: string;

  @IsDate()
  @Field({})
  updatedAt?: Date;
}
