// user-profile.dto.ts

import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { FilterableField, KeySet, CursorConnection, QueryOptions, Relation } from '@nestjs-query/query-graphql';
let GraphQLUpload: any;
let Upload: any;

if (process.env.USE_ESM_MODULES) {
  async function loadModule() {
    GraphQLUpload = await import('graphql-upload/GraphQLUpload.mjs');
    Upload = await import('graphql-upload/Upload.mjs');
  }
  loadModule();
}



@ObjectType("UserDTO")
export class UserDTO {
  @FilterableField(() => ID)
  id?: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
