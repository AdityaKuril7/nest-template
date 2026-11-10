import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  async validate_user(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
