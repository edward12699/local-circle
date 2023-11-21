import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { VoteInputDTO } from './dto/vote-input.dto';
import { VoteUpdateDTO } from './dto/vote-update.dto';
import { VoteResultDTO } from './dto/vote.dto'
import { VoteEntity } from './vote.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([VoteEntity])],
      resolvers: [
        {
          DTOClass: VoteResultDTO,
          EntityClass: VoteEntity,
          CreateDTOClass: VoteInputDTO,
          UpdateDTOClass: VoteUpdateDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class VoteModule { }
