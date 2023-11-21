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
    collection: 'votes',
    toObject: { virtuals: true }, // ???
  },
})
export class ChatRoomEntity implements Base {
  _id!: Types.ObjectId;

  id!: string;

  @Prop({ required: true })
  public name!: string;

  @Prop({ required: false })
  public description?: string;

  @Prop({ required: true })
  location!: Location

  @Prop({})
  public members!: [Types.ObjectId];

  @Prop({})
  public createBy!: Types.ObjectId;


  @Prop({ required: true })
  createdAt!: Date;

  @Prop({ required: false })
  updatedAt?: Date;
}

