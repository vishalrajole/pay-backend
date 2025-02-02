import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}
