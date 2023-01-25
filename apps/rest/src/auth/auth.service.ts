import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.model';
import { compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/user-create.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.userService.getByEmailOneUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOneUser(email: string) {
    return this.userService.getByEmailOneUser(email);
  }

  async findUser(email: string) {
    return this.userService.getByEmail(email);
  }

  async createUser(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
