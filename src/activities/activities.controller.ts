import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateActivityDto } from './CreateActivity.dto';
import { ActivitiesService } from './activities.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivitiesService) { }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  getActivities() {
    return this.activityService.getActivities();
  }

  @Get('id/:id')
  @UseGuards(AuthGuard('api-key'))
  findActivitiesById(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.findActivitiesById(id);
  }

  @Post('create')
  @UseGuards(AuthGuard('api-key'))
  @UsePipes(ValidationPipe)
  createActivities(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.createActivity(createActivityDto);
  }

  @Get(':category/:lang/:type/random')
  @UseGuards(AuthGuard('api-key'))
  async getRandomActivity(
    @Param('category') category: string,
    @Param('lang') lang: string,
    @Param('type') type: string,
  ) {
    try {
      const randomActivity = await this.activityService.getRandomActivity(category, lang, type);

      if (randomActivity) {
        return {
          success: true,
          data: randomActivity,
        };
      } else {
        return {
          success: false,
          message: 'No se encontraron actividades para la categoría , el tipo y el idioma especificados.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener la actividad al azar.',
        error: error.message,
      };
    }
  }
}