import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { FilterableField, KeySet, CursorConnection, QueryOptions } from '@nestjs-query/query-graphql';


@ObjectType()
export class VoteResultDTO {

  @Field({ nullable: true })
  reply!: Types.ObjectId;

  //"upvote" 或 "downvote"
  @Field({ nullable: true })
  voteType?: string;

  @FilterableField({ nullable: true })
  user!: Types.ObjectId;
}