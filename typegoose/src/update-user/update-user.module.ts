import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { UserEntity } from './user.entity'
import { TodoItemEntity } from '../todo-item/todo-item.entity';
import { UserDTO, } from "./dto/update-user.dto"
import { UserAssembler } from './user.assembler';
import { UserService } from './user.service'

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([UserEntity])],
      assemblers: [UserAssembler],
      resolvers: [
        {
          DTOClass: UserDTO,
          AssemblerClass: UserAssembler,
          EntityClass: UserEntity,
          enableAggregate: true,
        }
      ]
    })
  ]
})
export class UpdateUserModule { }





