import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './login.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AuthService, AuthResolver],
})
export class LoginModule { }
