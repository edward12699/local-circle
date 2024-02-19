import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AUTH_HEADER_NAME } from './constants';
import { config } from './config';
var jwt = require('jsonwebtoken');
const fs = require('fs');

export type GqlContext = { request: { headers: Record<string, string> } };

var publicKey = fs.readFileSync('public_key.pem');



@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext<GqlContext>().request;
    if (!req) {
      // ws
      return true
    }
    const { headers } = req
    const ctx = gqlContext.getContext();
    const info = gqlContext.getInfo();

    // this.logger.log(`Req = ${JSON.stringify(headers)}`);


    // pass login
    if (info.fieldName === 'login') {
      return true
    }

    const token = headers[AUTH_HEADER_NAME]
    let result
    // 在这里校验token是否合法
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, data) => {
      if (err) {
        result = false
      } else {
        // 校验id 一致性
        result = data.id === headers['id']
      }
    });
    return result
  }
}
