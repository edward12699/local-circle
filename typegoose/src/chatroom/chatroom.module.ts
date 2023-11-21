import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { ChatroomDTO } from './dto/chatroom.dto';
import { ChatroomInputDTO } from './dto/chatroom-input.dto';
import { ChatroomUpdateDTO } from './dto/chatroom-update.dto';
import { ChatRoomEntity } from './chatroom.entity';


@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([ChatRoomEntity])],
      resolvers: [
        {
          DTOClass: ChatroomDTO,
          EntityClass: ChatRoomEntity,
          CreateDTOClass: ChatroomInputDTO,
          UpdateDTOClass: ChatroomUpdateDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class ChatroomModule { }
