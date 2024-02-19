import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { PostDTO } from './dto/post.dto';
import { PostInputDTO } from './dto/post-input.dto';
import { PostEntity } from './post.entity';
import { PostResolver } from './post.resolver';
import { UpdateUserModule } from "../update-user/update-user.module"
import { PostService } from './post.service';


@Module({
  providers: [PostResolver, PostService],
  imports: [
    UpdateUserModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([PostEntity])],
      resolvers: [
        {
          DTOClass: PostDTO,
          EntityClass: PostEntity,
          CreateDTOClass: PostInputDTO,
          UpdateDTOClass: PostInputDTO,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class PostModule { }
