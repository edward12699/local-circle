import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { GqlContext } from './auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TagModule } from './tag/tag.module';
import { LoginModule } from './login/login.module'
import { TodoItemModule } from './todo-item/todo-item.module';
import { PostModule } from './post/post.module';
import { ReplyModule } from './reply/reply.module';
import { VoteModule } from './vote/vote.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { SubTaskModule } from './sub-task/sub-task.module';
import { UpdateUserModule } from './update-user/update-user.module'
import { mongooseConfig } from './helpers';
import { AuthGuard } from './auth.guard';
import { TransformInterceptor } from './interceptors'
import { RedisModule } from 'nestjs-redis'
import { ConfigModule } from '@nestjs/config';


import { options as redisOptions } from './redis.config'

const { uri, ...options } = mongooseConfig('local-circle', 'local', 'local-circle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

console.log(redisOptions)


@Module({
  imports: [
    ConfigModule.forRoot(),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    TypegooseModule.forRoot(uri!, options),
    // RedisModule.register(redisOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      // subscriptions: {
      //   'graphql-ws': true
      // },
      context: ({ req }: { req: { headers: Record<string, string> } }): GqlContext => ({ request: req }),
    }),
    SubTaskModule,
    TodoItemModule,
    TagModule,
    LoginModule,
    PostModule,
    ReplyModule,
    VoteModule,
    ChatroomModule,
    MessageModule,
    UpdateUserModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule { }
