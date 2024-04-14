/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { user: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser({ email, password }: AuthDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // its not working
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user?.password;
    if (user && isMatch) {
      const { password, ...result } = user;

      const jwt = await this.jwtService.sign(result);
      // delete user.password and return user and jwt

      const updatedUser = { id: result.id, access_token: jwt };
      return updatedUser;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
