import { Injectable, UnauthorizedException } from '@nestjs/common';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User, response: Response) {
    const expiresIn = new Date();

    expiresIn.setMilliseconds(
      expiresIn.getMilliseconds() +
        ms(
          this.configService.getOrThrow<string>(
            'JWT_EXPIRES_IN',
          ) as StringValue,
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: expiresIn,
    });

    return { tokenPayload };
  }
}
