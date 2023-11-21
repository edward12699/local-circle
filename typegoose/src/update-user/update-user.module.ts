import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { User } from './user.entity'
import { UpdateUserDTO, UpdateUserInput, QueryUserDTO, QueryUserInput } from "./dto/update-user.dto"

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([User])],
      resolvers: [
        {
          DTOClass: UpdateUserDTO,
          EntityClass: User,
          CreateDTOClass: UpdateUserInput,
          UpdateDTOClass: UpdateUserInput,
          enableAggregate: true,
        }
      ]
    })
  ],
})
export class UpdateUserModule { }





