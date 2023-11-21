import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { GqlContext } from './auth.guard';
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
import { mongooseConfig } from '../../helpers';

const { uri, ...options } = mongooseConfig('typegoose', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    TypegooseModule.forRoot(uri!, options),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
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
})
export class AppModule { }
