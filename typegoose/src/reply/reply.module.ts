import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { ReplyInputDTO } from './dto/reply-input.dto';
import { ReplyResultDTO } from './dto/reply.dto'
import { ReplyEntity } from './reply.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([ReplyEntity])],
      resolvers: [
        {
          DTOClass: ReplyResultDTO,
          EntityClass: ReplyEntity,
          CreateDTOClass: ReplyInputDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class ReplyModule { }
