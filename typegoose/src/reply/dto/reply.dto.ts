import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { FilterableField, KeySet, CursorConnection, QueryOptions } from '@nestjs-query/query-graphql';
import { Types } from 'mongoose';
import {
  Relation, BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
  FilterableUnPagedRelation,
  UnPagedRelation
} from '@nestjs-query/query-graphql';
import { PostDTO } from '../../post/dto/post.dto';
import { UserDTO } from '../../update-user/dto/update-user.dto';
import { GqlContext } from '../../auth.guard';
import { getUserID } from '../../helpers';
import { VoteDTO } from '../../vote/dto/vote.dto';

@ObjectType()
export class Votes {
  @Field()
  upVotes!: number;

  @Field()
  downVotes!: number
}

@ObjectType()
@Relation('post', () => PostDTO, { disableRemove: true })
@UnPagedRelation('votes', () => VoteDTO, { disableRemove: false })
export class ReplyDTO {
  @FilterableField(() => ID)
  id!: string;

  @Field()
  content!: string;

  @Field(() => [String], { nullable: true })
  images?: Array<string>


  @FilterableField({})
  createdAt!: Date;


  // @Field(() => UserDTO, {})
  // createdBy!: UserDTO;

  @Field(() => ID)
  createdBy: string;


  // @Field(() => Votes, { nullable: true })
  // votesCount?: Votes;

  // @Field(() => Boolean, { nullable: true })
  // votedByCurrentUser: Boolean | undefined;
}