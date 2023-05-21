import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../../apps/rest/src/users/dto/user-create.dto';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @ApiProperty({ default: 'test@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'sample_password' })
    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}