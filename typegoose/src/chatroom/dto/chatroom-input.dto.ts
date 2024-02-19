import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType, ID } from '@nestjs/graphql';
import { Location } from '../../shared/index';
import { Types } from 'mongoose';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { GqlContext } from '../../auth.guard';
import { ChatroomDTO } from './chatroom.dto';
import { getUserID } from '../../helpers';
import { ReplyDTO } from '../../reply/dto/reply.dto';
import { FilterableField, KeySet, CursorConnection, QueryOptions, Relation, UnPagedRelation } from '@nestjs-query/query-graphql';




@InputType('ChatroomInput')
@BeforeCreateOne((input: CreateOneInputType<ChatroomInputDTO>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.input.createdBy = getUserID(context);
  return input;
})
export class ChatroomInputDTO {
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  title!: string;

  @IsString()
  @Field({ nullable: true })
  content?: string;


  @Type(() => Location)
  @IsNotEmpty()
  @Field(() => Location, { nullable: false })
  location!: Location;

  @Field(() => ID, { nullable: true })
  createdBy?: string;


}
