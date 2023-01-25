import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @ApiProperty({ default: 'test.email@test.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'you_password' })
    @IsString()
    password: string;
  }

  export class Response {
    @ApiProperty({ default: 'this_is_sample_token_generation_string' })
    access_token: string;
  }
}
