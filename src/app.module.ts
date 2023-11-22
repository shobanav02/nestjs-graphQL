import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver , ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import  { ConfigModule , ConfigService } from '@nestjs/config';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import mongodbConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongodbConfig],
      isGlobal: true
   }),
   NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      playground: true,
      debug: configService.get<boolean>("DEBUG"),
      uploads: false,
    }),
  }),
  MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGO_URI')
    })
  }),
  BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
