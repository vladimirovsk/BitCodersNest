import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ default: 'test.email@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'you_password' })
  @IsBoolean()
  password: boolean;
}
