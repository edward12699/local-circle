import { IsOptional, IsString, ValidateNested, IsBoolean, IsMongoId, IsArray, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql';
import { Location } from '../post.entity'


@InputType('PostInput')
export class PostInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  openid!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  images?: Array<string>;

  @IsDate()
  @Field({})
  createdAt?: string;

  @ValidateNested()
  @Type(() => Location)
  @IsNotEmpty()
  @Field({ nullable: false })
  location!: Location;
}
