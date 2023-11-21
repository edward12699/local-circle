import { IsOptional, IsString, ValidateNested, IsBoolean, IsNumber, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, KeySet, CursorConnection, QueryOptions } from '@nestjs-query/query-graphql';



@ObjectType('Message')
export class MessageDTO {
  @FilterableField()
  success!: boolean;

}
