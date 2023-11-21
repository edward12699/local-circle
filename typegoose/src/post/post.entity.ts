import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';


export class Location {
  @Prop({ required: true, enum: ['Point'] })
  type!: string;

  @Prop({ required: true })
  coordinates!: number[]; //[经度, 纬度]
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'posts',
    toObject: { virtuals: true },
  },
})
export class PostEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  content!: string;

  @Prop({ required: false })
  images?: Array<string>


  @Prop({ required: true })
  createdAt!: Date;


  @Prop({ required: true })
  location!: Location

  @Prop({ required: true })
  user?: Types.ObjectId;

  @Prop()
  replies?: Array<Types.ObjectId>
}
