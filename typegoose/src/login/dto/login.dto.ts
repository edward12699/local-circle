// login-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDTO {
  @Field()
  id!: string;

  @Field()
  token!: string;

  @Field()
  nickname!: string;

  @Field()
  avatarUrl!: string;

}
