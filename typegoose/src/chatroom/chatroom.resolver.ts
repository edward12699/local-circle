import { Args, Query, Mutation, Resolver, Subscription, ResolveField, Parent, Context } from '@nestjs/graphql';
import { ChatroomDTO, tempChatroomDTO, WithinDistanceChatroomsResponse, chatHistoryDTO } from './dto/chatroom.dto';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { QueryService, InjectQueryService, Filter } from '@nestjs-query/core';
import { ChatroomEntity } from './chatroom.entity';
import { ChatroomQuery } from './types';
import { ChatroomService } from './chatroom.service'
import { UserDTO } from '../update-user/dto/update-user.dto';
import { getUserID } from '../helpers';
import { UserService } from '../update-user/user.service';



@Resolver(of => tempChatroomDTO)
export class ChatroomResolver {
  // constructor(private readonly userService: UserService) { }

  constructor(
    @InjectQueryService(ChatroomEntity) readonly service: QueryService<ChatroomEntity>,
    private chatroomService: ChatroomService, private readonly userService: UserService
  ) {
  }


  @Query(() => WithinDistanceChatroomsResponse)
  withinDistanceChatrooms(@Args() query: ChatroomQuery): Promise<{ result: tempChatroomDTO[] }> {
    return this.chatroomService.withinDistanceChatrooms(query);
  }

  @ResolveField('currentUsers', returns => [UserDTO])
  async getCurrentUsers(@Parent() tempChatroom: tempChatroomDTO): Promise<UserDTO[]> {
    const { id } = tempChatroom;
    const chatroom = await this.service.findById(id);
    const usersPromises = chatroom.currentUsers.map(async id => {
      const user = await this.userService.findById(id);
      return user
    })
    const users = await Promise.all(usersPromises);
    return users;
  }

  @Query(() => chatHistoryDTO)
  chatHistory(@Args('roomId') roomId: string, @Args('timestamp') timestamp: string, @Args('limit') limit: number): Promise<chatHistoryDTO> {
    return this.chatroomService.chatHistory(roomId, timestamp, limit);
  }


  @Mutation(() => Boolean)
  async sendMessage(
    @Args('roomId') roomId: string,
    @Args('message') message: string,
    @Context() context: any
  ) {
    const userID = getUserID(context)
    await this.chatroomService.sendMessage(roomId, message, userID);
    return true;
  }

  @Subscription(() => String, {
    // name: 'messageAdded1',
    filter: (payload, variables) =>
      payload.roomId === variables.roomId,
    resolve: (payload) => { return JSON.stringify(payload.content) },
  })
  subscribeToMessageAdded(@Args('roomId') roomId: string, @Args('userId') userId: string, @Context() context: any) {
    this.chatroomService.addUserToChatroom(roomId, userId)
    return this.chatroomService.getPublisher().asyncIterator('messageAdded');
  }
}
