import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { PostEntity } from '../post/post.entity';
import { VoteEntity } from '../vote/vote.entity';
import { UserEntity } from '../update-user/user.entity'


interface Votes {
  upVotes: number,
  downVotes: number
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


  // @Prop({ required: true })
  // createdAt!: Date;


  @Prop({ ref: () => UserEntity })
  createdBy!: Ref<UserEntity>;

  @Prop({ ref: () => PostEntity, required: true })
  post!: Ref<PostEntity>;


  @Prop({ ref: () => VoteEntity, required: false })
  votes?: Ref<VoteEntity>[];
}
