import { Injectable } from '@nestjs/common';
import { LoginResponseDTO } from './dto/login.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) { }

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

      // 这里假设微信API返回了accessToken和expiresIn
      return {
        openid: data.openid,
        session_key: data.session_key
      };
    } catch (error) {
      // 你需要根据错误类型来处理错误，并提供相应的反馈
      throw new Error('Error logging in with WeChat.');
    }
  }
}
