import { ConfigService } from '@nestjs/config';

import 'dotenv/config'

export const options = {
  name: 'local-circle',
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  db: parseInt(process.env.REDIS_DB),
  password: process.env.REDIS_PASSWORD,
  keyPrefix: process.env.REDIS_PRIFIX,
}