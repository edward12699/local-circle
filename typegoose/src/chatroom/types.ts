import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType, Field } from '@nestjs/graphql';
import { ChatroomDTO, WithinDistanceChatroomDto } from './dto/chatroom.dto';
import { Location } from '../shared/index';
// import { TodoItemDTO } from '../todo-item/dto/todo-item.dto'


// @ArgsType()
// export class ChatroomQuery extends QueryArgsType(WithinDistanceChatroomDto) { }

@ArgsType()
export class ChatroomQuery extends QueryArgsType(ChatroomDTO) {
  @Field(() => Location, { nullable: false })
  location!: Location;


  @Field({ nullable: false })
  withinDistance!: number;

}



export const ChatroomConnection = ChatroomQuery.ConnectionType;








