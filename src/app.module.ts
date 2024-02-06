import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyModule } from './property/property.module';
import { Property } from './property/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://semoleg1986:asawakan@atlascluster.bixifap.mongodb.net/?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      synchronize: true,
      logging: true,
      entities: [Property],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    PropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
