import {
  BadRequestException,
  Injectable, NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { UserService } from '../users/user.service';
import { ERROR_BAD_TOKEN_INFO } from './google-auth.constant';
import { User } from '../users/user.model';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
     private readonly userService: UserService,
     private readonly configService: ConfigService,

     private readonly authService: AuthService,
  ) {
     const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
     const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');
     this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async getCookiesForUser(user: User) {
    //  const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
    //    user.id,
    //  );
    //  const { cookie: refreshTokenCookie, token: refreshToken } =
    //    this.authService.getCookieWithJwtRefreshToken(user.id);
    //
    //  await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    //
    // return {
    //   accessTokenCookie,
    //   refreshTokenCookie,
    //   user
    // };
 }

  async handleRegisteredUser(user: User) {
    // if (!user.isRegisteredWithGoogle) {
    //   throw new UnauthorizedException();
    // }
    //
    // const { accessTokenCookie, refreshTokenCookie } =
    //   await this.getCookiesForUser(user);
    //
    // return {
    //   accessTokenCookie,
    //   refreshTokenCookie,
    //   user,
    // };
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    console.log(tokenInfo);
    const email = tokenInfo.email;
    if (!email) throw new BadRequestException(ERROR_BAD_TOKEN_INFO);

    try {
      const user = await this.userService.getByEmailOneUser(email);
        return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = String(userData.name);
    const user = await this.userService.createWithGoogle(email, name);
    return this.handleRegisteredUser(user);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token
    })

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    });

    return userInfoResponse.data;
  }
}
