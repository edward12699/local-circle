import { USER_HEADER_NAME, USER_HEADER_ID } from './constants';
import { GqlContext } from './auth.guard';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as geolib from 'geolib';

export const getUserName = (context: GqlContext): string => context.request.headers[USER_HEADER_NAME];



export const mongooseConfig = (
  db: string,
  username: string,
  password: string,
  overrides?: Partial<MongooseModuleOptions>
): MongooseModuleOptions => ({
  uri: `mongodb://${username}:${password}@localhost/${db}?authSource=admin`,
  useNewUrlParser: true,
  ...overrides,
});


export const getUserID = (context: GqlContext): string => context.request.headers[USER_HEADER_ID];



export function encodeCursor(id) {
  return Buffer.from(id.toString()).toString('base64');
}

export function decodeCursor(cursor) {
  return Buffer.from(cursor, 'base64').toString('ascii');
}


export function getDistanceBetweenTwoPoints(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const distance = geolib.getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );

  return distance; // 返回的距离单位为米
}

