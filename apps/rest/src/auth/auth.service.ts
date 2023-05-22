import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/user.model';
import { compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/user-create.dto';
import { RMQService } from 'nestjs-rmq';
import { GoogleSpreadsheetService } from '../../../../helpers/google-spreadsheet/google-spreadsheet.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements OnModuleInit {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    // private readonly rmqService: RMQService,

    private readonly configService: ConfigService,
    private readonly googleSheetService: GoogleSpreadsheetService,
  ) {}

  async onModuleInit() {
    // await this.googleSheetService.readDoc();
    //   //setInterval(() => {
    //   //setInterval(() => {
    //   for (let a = 0; a < 1000000; a++) {
    //     this.rmqService
    //       .send<number[], number>('sum.rpc', [1, 2, 3, 4, 5, 6, 7, 8, 9])
    //       .catch((err) => {
    //         this.logger.error(`Error send to rabbit ${err}`);
    //       })
    //       .finally(() => {
    //         console.log('Send to rabbit', a);
    //       });
    //   }
  }

  async validateUser(email: string,  password: string): Promise<Pick<User, 'email'>> {
    const user = await this.userService.getByEmailOneUserWithPassword(email);
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

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload = ''; //: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
  }

  public getCookieWithJwtAccessToken(userId: string) {
    const payload = '';// TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
  }
}
