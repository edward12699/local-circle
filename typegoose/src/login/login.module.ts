import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './login.resolver';
import { HttpModule } from '@nestjs/axios';
import { UpdateUserModule as UserModule } from '../update-user/update-user.module'
import { UserEntity } from '../update-user/user.entity'
import { getModelForClass } from '@typegoose/typegoose';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';



@Module({
  imports: [HttpModule, NestjsQueryTypegooseModule.forFeature([UserEntity])],
  providers: [AuthService, AuthResolver],
})
export class LoginModule { }
