import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';




@InputType('VoteInput')
export class VoteInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  voteType!: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  reply!: Types.ObjectId;

}
