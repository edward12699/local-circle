import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

interface votes {
  upvotes: number,
  downvotes: number
}


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'replies',
    toObject: { virtuals: true }, // ???
  },
})
export class ReplyEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop()
  content!: string;

  @Prop({ required: false })
  images?: Array<string>


  @Prop({ required: true })
  createdAt!: Date;


  @Prop({ required: true })
  user?: Types.ObjectId;

  @Prop({ required: true })
  post?: Types.ObjectId


  @Prop({ required: true })
  votes!: votes
}
