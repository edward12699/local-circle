import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref, index } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '../update-user/user.entity'
import { ReplyEntity } from '../reply/reply.entity';


import { LocationEntity } from '../shared/index';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'chatroom',
    toObject: { virtuals: true },
  },
})
@index({ location: '2dsphere' })
export class ChatroomEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: false })
  content?: string;

  // @Prop({ required: false })
  // images?: Array<string>


  @Prop({ required: true, type: LocationEntity })
  location!: LocationEntity

  @Prop({ ref: () => UserEntity })
  createdBy!: Ref<UserEntity>;

  @Prop({ required: false })
  liveNumber?: number;

  @Prop({ ref: () => UserEntity })
  currentUsers?: Ref<UserEntity>[];

}



@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'chatHistory',
    toObject: { virtuals: true },
  },
})
export class ChatHistoryEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;
  @Prop({ required: false })
  history: {
    createdBy: string,
    content: string,
    createdAt: Date
  }[]

}


