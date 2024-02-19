import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType, ID } from '@nestjs/graphql';
import { Location } from '../../shared/index';
import { Types } from 'mongoose';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { GqlContext } from '../../auth.guard';
import { PostDTO } from './post.dto';
import { getUserID } from '../../helpers';
import { ReplyDTO } from '../../reply/dto/reply.dto';
import { FilterableField, KeySet, CursorConnection, QueryOptions, Relation, UnPagedRelation } from '@nestjs-query/query-graphql';




@InputType('PostInput')
@UnPagedRelation('replies', () => ReplyDTO, { disableRemove: true })
@BeforeCreateOne((input: CreateOneInputType<PostInputDTO>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.input.createdBy = getUserID(context);
  return input;
})
@BeforeCreateMany((input: CreateManyInputType<PostInputDTO>, context: GqlContext) => {
  const createdBy = getUserID(context);
  // eslint-disable-next-line no-param-reassign
  input.input = input.input.map((c) => ({ ...c, createdBy }));
  return input;
})
export class PostInputDTO {
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: Array<string>;

  @Type(() => Location)
  @IsNotEmpty()
  @Field(() => Location, { nullable: false })
  location!: Location;

  @Field(() => ID, { nullable: true })
  createdBy?: string;
}
