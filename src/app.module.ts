import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { TodoItemModule } from './todo-item/todo-item.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/nest', options),
    GraphQLModule.forRoot({
      // set to true to automatically generate schema
      autoSchemaFile: true,
    }),
    TodoItemModule,
  ],
})
export class AppModule { }
