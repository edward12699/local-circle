import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from './user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserDTO } from './dto/update-user.dto';
import { Prop, modelOptions, Ref, index } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity) private readonly userModel: ReturnModelType<typeof UserEntity>,
  ) { }

  async findById(id: string | Ref<any>): Promise<UserDTO> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return this.toDTO(user);
  }

  private toDTO(user: UserEntity): UserDTO {
    return {
      id: user._id.toString(),
      nickname: user.nickname,
      avatarUrl: user.avatarUrl
    };
  }
}
