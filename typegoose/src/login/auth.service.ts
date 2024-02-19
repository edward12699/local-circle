import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { LoginResponseDTO } from './dto/login.dto';
import { TypegooseQueryService } from '@nestjs-query/query-typegoose';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from '../update-user/user.entity'
import { ReturnModelType } from '@typegoose/typegoose';
var jwt = require('jsonwebtoken');
const fs = require('fs');

var privateKey = fs.readFileSync('private_key.pem');
var publicKey = fs.readFileSync('public_key.pem');

@Injectable()
export class AuthService extends TypegooseQueryService<UserEntity>{
  constructor(private httpService: HttpService, @InjectModel(UserEntity) model: ReturnModelType<typeof UserEntity>) {
    super(model);
  }

  async loginWithWeChat(code: string): Promise<LoginResponseDTO> {
    try {
      // 替换为实际的微信API URL和参数
      const url = `https://api.weixin.qq.com/sns/jscode2session`;
      const params = {
        appid: 'wxd6a340accf14187a', // 你的微信应用ID
        secret: 'a9339e6d9ac155a80c56d328575256bd', // 你的微信应用密钥
        js_code: code,
        grant_type: 'authorization_code',
      };

      // 发送请求到微信服务器以获取session信息
      const response = await this.httpService.axiosRef.get(url, { params });
      const data = response.data;

      // 查询是否有该openid的用户
      const entities = await this.query({ filter: { openid: { eq: data.openid } } })
      let entity
      if (entities.length) {
        // 当然，其实只有一个
        entity = entities[0]
      } else {
        entity = await this.createOne({// ？？？ or this.model
          openid: data.openid,
        });
      }
      const token = jwt.sign({ id: entity.id }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });
      // 通过id创建token
      return {
        id: entity.id,
        token: token,
        nickname: entity.nickname || '',
        avatarUrl: entity.avatarUrl || ''
      };
    } catch (error) {
      console.log(error)
      // 你需要根据错误类型来处理错误，并提供相应的反馈
      throw new Error('Error logging in with WeChat.');
    }
  }
}
