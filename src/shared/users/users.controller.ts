import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserRequest } from './user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: TokenPayload) {
    return user;
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }
}
