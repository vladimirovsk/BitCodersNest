import { Body, Controller, HttpCode, HttpStatus, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user-create.dto';
import { AccountLogin } from '../../../../libs/contracts';
import { UserSelectDto } from '../users/dto/user-select.dto';
import { AuthTokenDto } from './auth.dto';
import { ResponseHttp } from '../../../../constant/response.dto';
import { RMQRoute } from 'nestjs-rmq';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private count = 1;

  constructor(
    private authService: AuthService
  ) {
  }

  @ApiOperation({ summary: 'Register user from token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
    type: UserSelectDto
  })
  @ApiForbiddenResponse({ description: 'You are not allowed' })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('register')
  // @RMQRoute(AccountRegister.topic)
  // @RMQValidate()
  async register(@Body() dto: CreateUserDto) { //Promise<AccountRegister.Response> {
    const oldUser = await this.authService.findOneUser(dto.login);
    if (oldUser) {
      return oldUser;
      //throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @ApiOperation({ summary: 'Login user by token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return generated token',
    type: AuthTokenDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not found',
    type: ResponseHttp.Error.NotFound
  })
  @ApiForbiddenResponse({ description: 'You are not allowed' })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  // @RMQRoute(AccountLogin.topic)
  // @RMQValidate()
  async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.email);
  }
}
