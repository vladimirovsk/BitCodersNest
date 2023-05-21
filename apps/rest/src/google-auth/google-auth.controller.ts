import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req, Get, HttpStatus, BadRequestException, UnauthorizedException
} from '@nestjs/common';
import TokenVerificationDto from './dto/token-verification.dto';
import { GoogleAuthService } from './google-auth.service';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
);

@Controller('google-auth')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(
     private readonly googleAuthService: GoogleAuthService
  ) {
  }


  @Get('callback')
  async callback(@Req() request: Request){
    console.log('GET', request.headers)
    return HttpStatus.OK;
    //return { method:'GET','status': 200}
  }

  @Post('callback')
    async authCallback(@Req() request: Request) {
      const token = request.body.credential
      //console.log(request);
      const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    }).catch((err)=> {throw new UnauthorizedException(err)})
    console.log(ticket.getPayload());

      //await this.googleAuthService.authenticate(tokenData.token);

    return HttpStatus.OK
    }
  @Post()
    async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
       const {
         accessTokenCookie,
         refreshTokenCookie,
         user,
       } = await this.googleAuthService.authenticate(tokenData.token);

    if (request.res!= undefined) {
      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    }

    return request
  }
}