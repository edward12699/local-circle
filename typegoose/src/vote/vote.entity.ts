import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserEntity } from '../update-user/user.entity'

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

  //"upvote" 或 "downvote"
  @Prop({ required: false })
  voteType?: string;

  @Prop({ ref: () => UserEntity })
  createdBy!: Ref<UserEntity>;
}
