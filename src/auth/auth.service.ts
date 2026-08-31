import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { HashingService } from '../common/hashing/hashing.service.js';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config.js';
@Injectable()
export class AuthService {
  constructor (
    private readonly prismaService:PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ){}
  async login(loginDto: LoginDto){
    const userValid = await this.prismaService.user.findUnique({
      where:{
        email: loginDto.email
      },
    });

    if(!userValid) throw new UnauthorizedException("Email or password is invalid");
    const isUser = await this.hashingService.compare(
      loginDto.password,
      userValid.password,
    );

    if (!isUser) {
      throw new UnauthorizedException('Email or password is invalid');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: userValid.id,
        email: userValid.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
