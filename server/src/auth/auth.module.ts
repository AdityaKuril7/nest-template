import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { LocalStrategy } from './strategies/local-auth.strategy.js';
import { JwtStrategy } from './strategies/jwt-auth.strategy.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
})
export class AuthModule {}
