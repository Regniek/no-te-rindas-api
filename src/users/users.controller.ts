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
    import { CreateUserDto } from './CreateUser.dto';
    import { UsersService } from './users.service';
    import { AuthGuard } from '@nestjs/passport';
    
    @Controller('users')
    export class UsersController {
      constructor(private readonly userService: UsersService) {}
      
      @Get()
      @UseGuards(AuthGuard('api-key'))
      getUsers() {
        return this.userService.getUsers();
      }
      
      @Get('id/:id')
      @UseGuards(AuthGuard('api-key'))
      findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUsersById(id);
      }
      
      @Post('create')
      @UseGuards(AuthGuard('api-key'))
      @UsePipes(ValidationPipe)
      createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
      }
    }