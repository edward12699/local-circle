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
    collection: 'posts',
    toObject: { virtuals: true },
  },
})
@index({ location: '2dsphere' })
export class PostEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  content!: string;

  @Prop({ required: false })
  images?: Array<string>


  // 这两个都会自动生成，不用指明了

  // @Prop({ required: false })
  // createdAt?: Date;

  // @Prop({ required: false })
  // updatedAt?: Date;


  @Prop({ required: true, type: LocationEntity })
  location!: LocationEntity

  @Prop({ ref: () => UserEntity })
  createdBy!: Ref<UserEntity>;

  // @Prop({
  //   ref: 'ReplyEntity',
  //   localField: '_id',
  //   foreignField: 'post',
  // })
  @Prop({ ref: () => ReplyEntity })
  replies?: Ref<ReplyEntity>[];
}


