// login-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDTO {
  @Field()
  openid!: string;

  @Field()
  session_key!: string;

}
