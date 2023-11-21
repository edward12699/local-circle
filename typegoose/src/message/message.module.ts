import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { MessageDTO } from './dto/message.dto';
import { MessageInputDTO } from './dto/message-input.dto';
import { MessageEntity } from './message.entity';


@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([MessageEntity])],
      resolvers: [
        {
          DTOClass: MessageDTO,
          EntityClass: MessageEntity,
          CreateDTOClass: MessageInputDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class MessageModule { }
