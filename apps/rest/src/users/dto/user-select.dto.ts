import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';

export class UserSelectDto {
  @ApiProperty({ default: 'Test User' })
  login: string;

  @ApiProperty({ default: 'test.email@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isRegisteredWithGoogle?: boolean;
}
