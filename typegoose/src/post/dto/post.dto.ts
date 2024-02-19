import { FilterableField, KeySet, CursorConnection, QueryOptions, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, ID, GraphQLISODateTime, Field } from '@nestjs/graphql';
import { ReplyDTO } from '../../reply/dto/reply.dto';
import { Location } from '../../shared/index';
import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { UserDTO } from '../../update-user/dto/update-user.dto';
import { Types } from 'mongoose';
import { PostEntity } from '../post.entity';


@ObjectType('Post')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@CursorConnection('replies', () => ReplyDTO, { disableRemove: true })
// @Relation('createdBy', () => UserDTO, { disableRemove: true })
export class PostDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  title!: string;

  @FilterableField({ nullable: true })
  content?: string;

  @Field(type => [String], { nullable: true })
  images?: Array<string>;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;


  @Field({ nullable: false })
  updatedAt?: Date;


  // @Field(() => Location, { nullable: false })
  // location!: Location;



  // 这就是正确的定义，graphql 只有ID 类型
  //在 GraphQL 解析器中，您可能需要将这个字符串类型的 ID 转换为 MongoDB 的 ObjectId。
  //在前端，这个字段将被视为字符串类型，所以前端的查询和处理逻辑应该基于此。
  // @Field(() => ID, { nullable: false })
  // createdBy?: string;

  // @Field(() => ID)
  // createdBy!: string;

  @Field(() => UserDTO, {})
  createdBy!: UserDTO;

}



@ObjectType()
class PageInfo1 {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true })
  startCursor: string | null;

  @Field(() => String, { nullable: true })
  endCursor: string | null;
}

// @ObjectType()
// class Edge<T> {
//   @Field(() => String)
//   cursor: string;

//   @Field(() => T)
//   node: T;
// }

@ObjectType()
class PostEdge1 {
  @Field(() => String)
  cursor: string;

  @Field(() => PostDTO)
  node: PostDTO;
}


@ObjectType()
export class withinDistancePostConnection {
  @Field(() => [PostEdge1])
  edges: Array<PostEdge1>;

  @Field(() => PageInfo1)
  pageInfo: PageInfo1;
}

