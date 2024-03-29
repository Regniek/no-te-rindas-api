import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService  } from '@nestjs/config';
// ... other import statements here
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import {TypeOrmModule} from '@nestjs/typeorm';

import entities from './typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: +configService.get<number>('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              entities: entities,
              synchronize: true,
              ssl: true,
            }),
            inject: [ConfigService],
          }),
        AuthModule,
        ActivitiesModule,
        UsersModule
    ],
    controllers: [
    	
    ],
    providers: [
    	// providers here
    ],
})
export class AppModule { }