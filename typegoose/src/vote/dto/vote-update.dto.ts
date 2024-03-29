import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';




@InputType('VoteUpdate')
export class VoteUpdateDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  voteType!: string;

  @Field(() => ID)
  @IsMongoId()
  @IsNotEmpty()
  reply!: Types.ObjectId;

}
