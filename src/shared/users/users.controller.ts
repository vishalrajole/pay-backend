import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserRequest } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}
