import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TypegooseQueryService } from '@nestjs-query/query-typegoose';
import { HttpService } from '@nestjs/axios';
import { ChatroomEntity, ChatHistoryEntity } from './chatroom.entity'
import { ReturnModelType } from '@typegoose/typegoose';
import { chatHistoryDTO, tempChatroomDTO } from './dto/chatroom.dto';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from "ioredis";
import { UserService } from '../update-user/user.service';
import { UserDTO } from '../update-user/dto/update-user.dto';
const { ObjectId } = require('mongodb');
import { getDistanceBetweenTwoPoints } from '../helpers'




@Injectable()
export class ChatroomService {
  private pubSub: RedisPubSub;
  constructor(@InjectModel(ChatroomEntity) private readonly model: ReturnModelType<typeof ChatroomEntity>,
    @InjectModel(ChatHistoryEntity) private readonly historyModel: ReturnModelType<typeof ChatHistoryEntity>,
    private userService: UserService
  ) {
    // https://github.com/redis/ioredis
    const options = {
      // host: 'localhost', //本地启动用
      host: 'local-circle-redis-1',
      // port: Number(process.env.REDIS_PORT),
      port: 6379,
      password: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB),
      keyPrefix: process.env.REDIS_PRIFIX
    };
    console.log('redis option ', options)

    try {
      this.pubSub = new RedisPubSub({
        publisher: new Redis(options),
        subscriber: new Redis(options),
      });
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage(roomId: string, message: string, userID: string): Promise<void> {
    // const timestamp = new Date().toISOString();
    const timestamp = new Date()
    // insert message to historyModel
    await this.historyModel.findByIdAndUpdate(roomId, { $push: { history: { createdBy: userID, message, createdAt: timestamp } } }, { new: true, upsert: true })
    const userDto: UserDTO = await this.userService.findById(userID);
    const payload = { roomId, content: { user: userDto, message, timestamp } };
    this.pubSub.publish('messageAdded', payload);
  }

  async chatHistory(roomId: string, timestamp: string, limit: number): Promise<chatHistoryDTO> {
    //默认的limit是10，即每次返回10条给客户端
    let result;
    timestamp = timestamp || new Date().toISOString();
    //根据传递的timestamp，快速找到这个createdBy所对应的数组的index
    result = await this.historyModel.aggregate([
      { $match: { _id: ObjectId(roomId) } },
      {
        $project: {
          history: {
            $slice: [
              {
                $filter: {
                  input: "$history",
                  as: "item",
                  cond: { $lt: ["$$item.createdAt", new Date(timestamp)] }
                }
              },
              -limit // 限制结果数量为10，取最后10个
            ]
          },
          // 包括其他需要保留的字段
        }
      }
    ]);
    return result[0]
  }

  getPublisher() {
    return this.pubSub;
  }

  async addUserToChatroom(roomId: string, userId: string) {
    await this.model.findByIdAndUpdate(roomId, { $push: { currentUsers: userId } }, { new: true, upsert: true })
  }

  async withinDistanceChatrooms(query: any): Promise<{ result: tempChatroomDTO[] }> {
    try {
      let { location, withinDistance, filter, paging, sorting } = query;
      const locationFilter = {
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [location.coordinates[0], location.coordinates[1]],
            },
            $maxDistance: withinDistance,
          },
        },
      };

      const entities = await this.model.find(locationFilter).populate('currentUsers', 'id avatarUrl nickname').exec();
      const result = entities.map(v => {
        const currentUsers = (v.currentUsers as any).map((u) => {
          return {
            id: u.id,
            avatarUrl: u.avatarUrl,
            nickname: u.nickname
          }
        })
        const distance = getDistanceBetweenTwoPoints(location.coordinates[1], location.coordinates[0], v.location.coordinates[1], v.location.coordinates[0])
        return {
          id: v.id,
          title: v.title,
          distance: distance
          // currentUsers: currentUsers || []
        }
      })
      return {
        result: result
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error logging in with WeChat.');
    }
  }
}


