import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { ChatroomDTO, tempChatroomDTO } from './dto/chatroom.dto';
import { ChatroomInputDTO } from './dto/chatroom-input.dto';
import { ChatroomEntity, ChatHistoryEntity } from './chatroom.entity';
import { ChatroomResolver } from './chatroom.resolver';
import { UpdateUserModule } from "../update-user/update-user.module"
import { ChatroomService } from './chatroom.service';


@Module({
  providers: [ChatroomResolver, ChatroomService],
  imports: [
    UpdateUserModule,
    NestjsQueryTypegooseModule.forFeature([ChatHistoryEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([ChatroomEntity])],
      resolvers: [
        {
          DTOClass: tempChatroomDTO,
          EntityClass: ChatroomEntity,
          CreateDTOClass: ChatroomInputDTO,
          UpdateDTOClass: ChatroomInputDTO,
          enableAggregate: true
        },
      ],
    }),
  ],
})
export class ChatroomModule { }
