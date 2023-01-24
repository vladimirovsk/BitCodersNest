import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constant';
import { UserEmail } from '../decorators/user-email.decorator';
import { CreateUserDto } from '../users/dto/user-create.dto';
import { AccountLogin } from '../../../../libs/contracts';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() {email, password}: AccountLogin.Request): Promise<AccountLogin.Response> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.email);
  }

}