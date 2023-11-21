import { ObjectType, Field } from '@nestjs/graphql';
import { FilterableField, KeySet, CursorConnection, QueryOptions } from '@nestjs-query/query-graphql';
import { Types } from 'mongoose';

class votes {
  upvotes!: number
  downvotes!: number
}

@ObjectType()
export class ReplyResultDTO {

  @Field()
  content!: string;

  @Field(() => [String], { nullable: true })
  images?: Array<string>


  @FilterableField({})
  createdAt!: Date;


  @Field({})
  user?: Types.ObjectId;

  @Field({})
  post?: Types.ObjectId


  @Field(() => votes)
  votes!: votes
}