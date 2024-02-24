import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, uri } from './app.module.js';
import { mongoose } from '@typegoose/typegoose';

async function bootstrap(): Promise<void> {

  async function waitForMongoDB() {
    const maxRetries = 5;
    let currentRetries = 0;

    async function tryConnect() {
      try {
        // Try to connect to MongoDB using mongoose
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
      } catch (error) {
        // If connection fails, log the error and wait for a moment
        console.error(`Error connecting to MongoDB: ${error.message}`);
        currentRetries++;

        if (currentRetries < maxRetries) {
          console.log(`Retrying in 5 seconds (Retry ${currentRetries}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          await tryConnect(); // Retry
        } else {
          console.error(`Max retries reached. Unable to connect to MongoDB.`);
          process.exit(1); // You may want to handle this differently based on your application's requirements
        }
      }
    }

    await tryConnect();
  }
  await waitForMongoDB()
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // new ValidationPipe({
    //   transform: true,
    //   whitelist: true,
    //   forbidNonWhitelisted: true,
    //   skipMissingProperties: false,
    //   forbidUnknownValues: false,// 据说是个库的bug，先设为false,https://github.com/typestack/class-validator/issues/1873
    // }),
  );

  await app.listen(3000);
}

// eslint-disable-next-line no-void


void bootstrap();



