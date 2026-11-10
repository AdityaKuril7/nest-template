import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from '../auth/dto/register.dto.js';
import bcrypt from 'bcryptjs';
import { registerSchema } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(registerDto: RegisterDto) {
    const u = await this.findByEmail(registerDto.email);
    if (u) {
      throw new ConflictException('User already exsist !');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...registerDto, password: hashedPassword },
      omit: { password: true },
    });

    return user;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found !');
    }
    return user;
  }

  async update(id: number, updateUserDto: { username: string | null }) {
    await this.findOne(id);

    if (updateUserDto.username) {
      return await this.prisma.user.update({
        where: { id: id },
        data: { username: updateUserDto.username },
      });
    } else {
      throw new ConflictException('Username not provide !');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
