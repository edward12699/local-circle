import { IsOptional, IsString, ValidateNested, IsBoolean, IsNumber, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, KeySet, CursorConnection, QueryOptions } from '@nestjs-query/query-graphql';



@ObjectType('Chatroom')
export class ChatroomDTO {

  @FilterableField()
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @Field({ nullable: false })
  name?: string;

  @IsString()
  @Field({ nullable: false })
  description?: string;

  @IsString()
  @Field({ nullable: false })
  distance?: string;

  @IsNumber()
  @Field({ nullable: false })
  heat?: number;

  @IsNumber()
  @Field({ nullable: false })
  memberCount?: number;

  @IsDate()
  @Field({})
  updatedAt?: Date;


  @IsDate()
  @Field({})
  createdAt?: Date;

}
