import { InputType, Field } from '@nestjs/graphql';
import { Prop, modelOptions, Ref, index } from '@typegoose/typegoose';

// dto
@InputType()
export class Location {
  @Field({ nullable: true })
  type?: string;

  @Field(() => [Number])
  coordinates!: Number[]; // [经度, 纬度]
}



// entity

export class LocationEntity {
  @Prop({ default: 'Point' })
  type?: string

  @Prop({ required: true })
  public coordinates!: number[];
}

