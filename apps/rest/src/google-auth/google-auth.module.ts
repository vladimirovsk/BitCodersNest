import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    UserModule,
    ConfigModule,
    AuthModule,
  ],
  providers: [GoogleAuthService],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
