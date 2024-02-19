import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { ReplyDTO } from './dto/reply.dto';
import { ReplyEntity } from './reply.entity';
// import { UserService } from '../update-user/user.service';

@Assembler(ReplyDTO, ReplyEntity)
export class ReplyAssembler extends ClassTransformerAssembler<ReplyDTO, ReplyEntity> {

  // constructor(private readonly userService: UserService) {
  //   super()
  // }
  // convertToCreateEntity(create: UserDTO): UserEntity {
  //   const entity = super.convertToEntity(create);
  //   entity.avatarUrl = create.nickname + create.avatarUrl
  //   return entity;
  // }

  convertToDTO(entity: ReplyEntity): ReplyDTO {
    const dto = super.convertToDTO(entity);

    return dto;
  }

}
