import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'votes',
    toObject: { virtuals: true }, // ???
  },
})
export class VoteEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  reply!: Types.ObjectId;

  //"upvote" 或 "downvote"
  @Prop()
  voteType?: string;

  @Prop({ required: true })
  user!: Types.ObjectId;
}
