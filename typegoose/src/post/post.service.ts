import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TypegooseQueryService } from '@nestjs-query/query-typegoose';
import { HttpService } from '@nestjs/axios';
import { PostEntity } from './post.entity'
import { ReturnModelType } from '@typegoose/typegoose';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from "ioredis";
import { UserService } from '../update-user/user.service';
import { UserDTO } from '../update-user/dto/update-user.dto';
const { ObjectId } = require('mongodb');
import { PageInfo, ItemEdge } from './types';
import { encodeCursor, decodeCursor } from '../helpers'




@Injectable()
export class PostService {
  constructor(@InjectModel(PostEntity) private readonly model: ReturnModelType<typeof PostEntity>,
    private userService: UserService
  ) {
  }


  private generateCursorForItem(item): string {
    return encodeCursor(item._id);
  }

  private async getItemsAfterCursor(after: string, first: number, location: any, withinDistance): Promise<PostEntity[]> {
    let locationFilter;
    if (after) {
      locationFilter = {
        _id: { $gt: after },
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
    } else {
      locationFilter = {
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
    }

    const entities = await this.model.find(locationFilter).sort({ _id: 1 }).limit(first + 1)
    return entities
  }


  async withinDistancePosts(query: any): Promise<{ edges: ItemEdge<PostEntity>[], pageInfo: PageInfo }> {
    try {
      let { location, withinDistance, first, after } = query;
      after = after && decodeCursor(after);
      const posts = await this.getItemsAfterCursor(after, first, location, withinDistance);
      let hasNextPage = false
      if (posts.length > first) {
        hasNextPage = true;
        posts.pop()
      }
      const hasPreviousPage = Boolean(after); //传入after 可以默认存在前一页
      const edges = posts.map(item => ({ node: item, cursor: this.generateCursorForItem(item) }));
      const pageInfo = {
        hasNextPage,
        hasPreviousPage,
        startCursor: edges.length && edges[0].cursor,
        endCursor: edges.length && edges[edges.length - 1].cursor,
      }

      return { edges, pageInfo };
    } catch (error) {
      console.log(error)
      throw new Error('Error logging in with WeChat.');
    }
  }
}


