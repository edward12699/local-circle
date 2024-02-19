import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CreateResolver, CreateOneInputType, MutationArgsType } from '@nestjs-query/query-graphql';
import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ReplyDTO } from './dto/reply.dto';
import { ReplyInputDTO } from './dto/reply-input.dto';
import { ReplyEntity } from './reply.entity';
import { PostEntity } from "../post/post.entity"
import { UserService } from '../update-user/user.service';
import { UserDTO } from '../update-user/dto/update-user.dto';
import { Votes } from './dto/reply.dto'

@Resolver(() => ReplyDTO)
export class ReplyInputResolver extends CreateResolver<ReplyDTO, ReplyInputDTO>(ReplyDTO) {
  constructor(
    @InjectQueryService(ReplyEntity) readonly service: QueryService<ReplyDTO, ReplyInputDTO>, private readonly userService: UserService
    // @InjectQueryService(PostEntity) readonly postService: QueryService<PostEntity>
  ) {
    super(service);
  }


  @ResolveField('createdBy', returns => UserDTO)
  async getCreatedBy(@Parent() reply: ReplyDTO): Promise<UserDTO> {
    const user = await this.userService.findById(reply.createdBy);
    return user;
  }

  @ResolveField('votesCount', returns => Votes)
  async getVotesCount(@Parent() reply: ReplyDTO): Promise<void> {
  }

  // 废弃，交给前端来另外做一次add or set
  @Mutation(() => ReplyDTO)
  async createOneReply1(@Args('input', { name: 'input', type: () => ReplyInputDTO }) input: MutationArgsType<CreateOneInputType<ReplyInputDTO>>): Promise<ReplyDTO> {
    const createdTodoItem = await super.createOne(input);
    debugger
    // await this.postService.updateOne(input.input.input.post as undefined as string, { $addToSet: { replies: createdTodoItem.id } });
    return createdTodoItem;
  }
}