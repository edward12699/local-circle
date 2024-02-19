import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType, Field } from '@nestjs/graphql';
import { PostDTO } from './dto/post.dto';
import { Location } from '../shared/index';
// import { TodoItemDTO } from '../todo-item/dto/todo-item.dto'


// @ArgsType()
// export class ChatroomQuery extends QueryArgsType(WithinDistanceChatroomDto) { }

@ArgsType()
export class PostQuery extends QueryArgsType(PostDTO) {
  @Field(() => Location, { nullable: false })
  location!: Location;


  @Field({ nullable: false })
  withinDistance!: number;

  @Field({ nullable: false })
  first: number;

  @Field({ nullable: true })
  after: string
}


// export type QueryInput = {
//   first: number,
//   after: string
// }


export type ItemEdge<T> = {
  node: T
  cursor: String
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}



export const PostConnection = PostQuery.ConnectionType;








