import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { PostDTO, withinDistancePostConnection } from './dto/post.dto';
import { UserDTO } from '../update-user/dto/update-user.dto';
import { UserService } from '../update-user/user.service';
import { PostQuery, ItemEdge, PageInfo } from './types';
import { PostService } from './post.service'
import { PostEntity } from './post.entity';


type ItemConnection = {
  edges: ItemEdge<PostEntity>[]
  pageInfo: PageInfo
}



@Resolver(() => PostDTO)
export class PostResolver {
  constructor(private readonly postService: PostService) {

  }

  // @ResolveField('createdBy', returns => UserDTO)
  // async getCreatedBy(@Parent() post: PostDTO): Promise<UserDTO> {
  //   const user = await this.userService.findById(post.createdBy);
  //   return user;
  // }

  @Query(() => withinDistancePostConnection)
  withinDistancePosts(@Args() query: PostQuery): Promise<ItemConnection> {
    return this.postService.withinDistancePosts(query);
  }
}
