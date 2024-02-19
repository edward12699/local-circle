import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import {
  FilterableField, KeySet, CursorConnection, QueryOptions, Relation, BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { getUserID } from '../../helpers';
import { GqlContext } from '../../auth.guard';
import { UserDTO } from '../../update-user/dto/update-user.dto';



@ObjectType()
export class VoteDTO {

  @FilterableField(() => ID)
  id: string

  // @Field(() => ID, { nullable: true })
  // reply!: Types.ObjectId;

  //"upvote" 或 "downvote"
  @FilterableField({ nullable: true })
  voteType?: string;

  @FilterableField(() => ID, {})
  createdBy!: string;
}