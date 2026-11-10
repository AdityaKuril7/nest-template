import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { type Request } from 'express';
import { LocalAuthGuard } from './guard/local-auth.guard.js';
import { User } from '../generated/prisma/client.js';
import { JwtAuthGuard } from './guard/jwt-auth.guard.js';
import { type AuthenticatedRequest } from './strategies/local-auth.strategy.js';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: AuthenticatedRequest) {
    return await this.authService.profile(req.user.sub);
  }
}
