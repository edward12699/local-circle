import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';


// 两种都行
type ContentType = 'text' | 'image' | 'video';
export enum _ContentType {
  Text = 'text',
  Image = 'image',
  Video = 'video'
}


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'votes',
    toObject: { virtuals: true }, // ???
  },
})
export class MessageEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  public contentType!: _ContentType;

  @Prop({ required: true })
  public content!: string;

  @Prop({})
  public sender!: Types.ObjectId;

  @Prop({ required: true })
  timestamp!: Date;

}

