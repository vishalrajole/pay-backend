import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './user.dto';

@Injectable()
export class UsersService {
  async createUser(data: CreateUserRequest) {
    console.log('data', data);
  }
}
