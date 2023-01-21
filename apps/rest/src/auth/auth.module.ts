import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../../../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
  ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
