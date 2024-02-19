import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { ReplyInputDTO } from './dto/reply-input.dto';
import { ReplyDTO } from './dto/reply.dto'
import { ReplyEntity } from './reply.entity';
import { ReplyInputResolver } from './reply.resolver';
import { ReplyAssembler } from './reply.assembler';
import { UpdateUserModule } from "../update-user/update-user.module"

@Module({
  providers: [ReplyInputResolver],
  imports: [
    UpdateUserModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([ReplyEntity])],
      assemblers: [ReplyAssembler],
      resolvers: [
        {
          DTOClass: ReplyDTO,
          EntityClass: ReplyEntity,
          AssemblerClass: ReplyAssembler,
          CreateDTOClass: ReplyInputDTO,
          UpdateDTOClass: ReplyInputDTO,
          enableAggregate: true,

        },
      ],
    }),
  ],
})
export class ReplyModule { }
