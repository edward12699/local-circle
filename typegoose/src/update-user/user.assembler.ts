import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Assembler(UserDTO, UserEntity)
export class UserAssembler extends ClassTransformerAssembler<UserDTO, UserEntity> {
  // convertToCreateEntity(create: UserDTO): UserEntity {
  //   const entity = super.convertToEntity(create);
  //   entity.avatarUrl = create.nickname + create.avatarUrl
  //   return entity;
  // }
}
