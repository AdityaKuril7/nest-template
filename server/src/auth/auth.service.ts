import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcryptjs';
import { User } from '../generated/prisma/client.js';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  async login(user: User) {
    const payLoad = { sub: user.id, email: user.email };

    return await this.jwtService.signAsync(payLoad)
  }

  async profile(id: number) {
    const user = await this.userService.findOne(id);
    const { password: _, ...result } = user;
    return result;
  }

  async validate_user(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
