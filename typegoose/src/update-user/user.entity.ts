import { getModelForClass, modelOptions, Prop } from '@typegoose/typegoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users',
    toObject: { virtuals: true },
  },
})
export class User implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: false })
  openid!: string;

  @Prop()
  nickname!: string;

  @Prop()
  avatarUrl!: string;
}

