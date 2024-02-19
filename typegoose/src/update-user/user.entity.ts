import { getModelForClass, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'user',
    toObject: { virtuals: true },
  },
})
export class UserEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  openid!: string;

  @Prop()
  nickname!: string;

  @Prop()
  avatarUrl!: string;
}

