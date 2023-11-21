// user-profile.dto.ts

import { ObjectType, Field, InputType } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import Upload from 'graphql-upload/Upload.mjs';

@ObjectType()
export class UpdateUserDTO {
  @Field()
  status!: boolean;
}

@InputType()
export class UpdateUserInput {
  @Field()
  openid!: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  avatar?: Promise<Upload['promise']>; // ??? to fix
}


@ObjectType()
export class QueryUserDTO {
  @Field()
  openid!: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  avatarUrl?: string;
}

@InputType()
export class QueryUserInput {
  @Field()
  openid!: string;
}
