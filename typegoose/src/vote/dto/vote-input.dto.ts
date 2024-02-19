import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { GqlContext } from '../../auth.guard';
import { getUserID } from '../../helpers';
import {
  Relation, BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
  FilterableField
} from '@nestjs-query/query-graphql';



@InputType('VoteInput')
@BeforeCreateOne((input: CreateOneInputType<VoteInputDTO>, context: GqlContext) => {
  input.input.createdBy = getUserID(context)
  return input;
})
export class VoteInputDTO {

  @IsString()
  @IsNotEmpty()
  @FilterableField({ nullable: false })
  voteType!: string;

  // @Field(() => ID)
  // @IsMongoId()
  // @IsNotEmpty()
  // reply!: Types.ObjectId;

  @FilterableField(() => String, { nullable: true })
  createdBy?: string;
}
