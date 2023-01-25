import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'test@login.ask.email.com' })
  @IsString()
  login: string;

  @ApiProperty({ default: 'test_password' })
  @IsString()
  password: string;
}
