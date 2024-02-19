import { FilterableField, KeySet, CursorConnection, QueryOptions, Relation, UnPagedRelation } from '@nestjs-query/query-graphql';
import { ObjectType, ID, GraphQLISODateTime, Field } from '@nestjs/graphql';
import { ReplyDTO } from '../../reply/dto/reply.dto';
import { Location } from '../../shared/index';
import { IsOptional, IsString, ValidateNested, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { UserDTO } from '../../update-user/dto/update-user.dto';
import { Types } from 'mongoose';


@ObjectType('Chatroom')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
export class ChatroomDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  title!: string;

  @FilterableField({ nullable: true })
  content?: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;


  @Field({ nullable: false })
  updatedAt?: Date;

  // 这就是正确的定义，graphql 只有ID 类型
  //在 GraphQL 解析器中，您可能需要将这个字符串类型的 ID 转换为 MongoDB 的 ObjectId。
  //在前端，这个字段将被视为字符串类型，所以前端的查询和处理逻辑应该基于此。
  // @Field(() => ID, { nullable: false })
  // createdBy?: string;

  // @Field(() => ID)
  // createdBy!: string;

  @Field(() => UserDTO, {})
  createdBy!: UserDTO;

  @FilterableField({ nullable: false })
  liveNumber!: number;

  @FilterableField({ nullable: false })
  hotCount?: number;

  @FilterableField({ nullable: false })
  distance?: number;

}



// @ObjectType('Chatroom')
// @CursorConnection('currentUsers', () => UserDTO, { disableRemove: true })
// export class ChatroomTitle {
//   @Field()
//   id: string;

//   @Field()
//   title: string;
// }

@ObjectType('tempChatroomDTO')
@QueryOptions({ enableTotalCount: true })
@UnPagedRelation('currentUsers', () => UserDTO, { disableRemove: false })
export class tempChatroomDTO {


  @FilterableField()
  id: string;

  @Field()
  title: string;

  @Field()
  distance: number;

  // @Field(() => [UserDTO], { nullable: true }) // 这里假设整个列表可以为null
  // currentUsers?: UserDTO[];

}

@ObjectType()
export class WithinDistanceChatroomsResponse {
  @Field(() => [tempChatroomDTO])
  result: tempChatroomDTO[];
}


@ObjectType('chatHistoryDTO')
@QueryOptions({ enableTotalCount: true })
export class chatHistoryDTO {

  @Field(() => ID)
  _id!: string;

  @Field(() => [chatHistoryItemDTO], { nullable: true })
  history: chatHistoryItemDTO[]

}

@ObjectType('chatHistoryItemDTO')
@QueryOptions({ enableTotalCount: true })
export class chatHistoryItemDTO {
  @Field(() => UserDTO, { nullable: true })
  createdBy: UserDTO
  @Field(() => String, { nullable: true })
  message: string

  @Field(() => Date, { nullable: true })
  createdAt: Date
}





@ObjectType('withinDistanceChatroom')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
export class WithinDistanceChatroomDto {
  @FilterableField(() => ID)
  id!: string;

  @Type(() => Location)
  @IsNotEmpty()
  @Field(() => Location, { nullable: false })
  location!: Location;


  @Field({ nullable: false })
  withinDistance!: number;

}
