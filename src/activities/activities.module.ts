import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]),],
  controllers: [ActivitiesController],
  providers: [ActivitiesService]
})
export class ActivitiesModule {}
