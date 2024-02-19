import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './update-user/user.service';
import { UserDTO } from './update-user/dto/update-user.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private userService: UserService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async data => {
        if (data && data.createdBy) {
          const userDto: UserDTO = await this.userService.findById(data.createdBy);
          data.createdBy = userDto;
        }
        // 对chathistory 的内嵌history中的createdBy做同样处理
        if (data && data.history) {
          data.history = await Promise.all(data.history.map(async item => {
            if (item.createdBy) {
              const userDto: UserDTO = await this.userService.findById(item.createdBy);
              item.createdBy = userDto;
            }
            return item;
          }))
        }
        return data;
      })

      // map(async data => {
      //   await this.transformData(data);
      //   return data;
      // })
    );
  }

  //   private async transformData(data: any) {
  //   if (Array.isArray(data)) {
  //     // 处理数组中的每个元素
  //     await Promise.all(data.map(item => this.transformData(item)));
  //   } else if (data && typeof data === 'object') {
  //     // 处理具体对象
  //     if (data.createdBy) {
  //       data.createdBy = await this.userService.findById(data.createdBy);
  //     }
  //     // 递归处理嵌套对象
  //     Object.values(data).forEach(value => {
  //       if (typeof value === 'object') {
  //         this.transformData(value);
  //       }
  //     });
  //   }
  // }
}
