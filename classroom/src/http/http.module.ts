import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { TestResolver } from './test.graphql.resolver';
import { TestController } from './test.prisma.controller';

@Module({
  // Configuração par ao nest entender process.env
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [
    TestController
  ],
  providers: [
    TestResolver
  ],
})
export class HttpModule { }
