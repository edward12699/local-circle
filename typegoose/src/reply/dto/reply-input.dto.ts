import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { GqlContext } from '../../auth.guard';
import { getUserID } from '../../helpers';
import { PostDTO } from '../../post/dto/post.dto';
import {
  Relation, BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
  FilterableField
} from '@nestjs-query/query-graphql';


@InputType('ReplyInput')
@Relation('post', () => PostDTO, { disableRemove: true })
@BeforeCreateOne((input: CreateOneInputType<ReplyInputDTO>, context: GqlContext) => {
  input.input.createdBy = getUserID(context)
  // const createdAt = new Date();
  // input.input.createdAt = createdAt
  return input;
})
export class ReplyInputDTO {

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: Array<string>;

  @Field(() => String, { nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  createdAt?: Date;


  @Field(() => ID)
  @IsMongoId()
  @IsNotEmpty()
  post!: Types.ObjectId;

}
