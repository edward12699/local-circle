import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { PostDTO } from './dto/post.dto';
import { PostInputDTO } from './dto/post-input.dto';
import { PostEntity } from './post.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([PostEntity])],
      resolvers: [
        {
          DTOClass: PostDTO,
          EntityClass: PostEntity,
          CreateDTOClass: PostInputDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class PostModule { }
