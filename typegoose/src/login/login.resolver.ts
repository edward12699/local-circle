// auth.resolver.ts
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => LoginResponseDTO)
  async login(@Args('code') code: string): Promise<LoginResponseDTO> {
    return this.authService.loginWithWeChat(code);
  }
}
