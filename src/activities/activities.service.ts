import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './CreateActivity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>,
  ) {}

  createActivity(createActivityDto: CreateActivityDto) {
    const newActivity = this.activityRepository.create(createActivityDto);
    return this.activityRepository.save(newActivity);
  }

  getActivities() {
    return this.activityRepository.find();
  }

  findActivitiesById(id: any) {
    return this.activityRepository.findOne(id);
  }

  async getRandomActivity(category: string, lang: string,type: string): Promise<Activity | null> {
    const randomActivity = await this.activityRepository
      .createQueryBuilder()
      .select()
      .where("category = :category", { category })
      .andWhere("lang = :lang", { lang })
      .andWhere("type = :type", { type })
      .orderBy("RANDOM()") 
      .limit(1)
      .getOne();

    return randomActivity || null;
  }
}