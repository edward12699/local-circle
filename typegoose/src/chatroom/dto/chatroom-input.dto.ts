import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';
import { Location } from '../chatroom.entity'


@InputType('ChatroomInput')
export class ChatroomInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  description?: string;

  @IsDate()
  @Field({})
  createdAt?: string;

  @ValidateNested()
  @Type(() => Location)
  @IsNotEmpty()
  @Field({ nullable: false })
  location!: Location;
}
