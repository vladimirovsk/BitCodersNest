import { Exclude } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @Exclude()
  @IsString()
  _id?: string;

  @IsString()
  login?: string;

  @IsString()
  password?: string;

  @IsString()
  token?: string;

  @IsBoolean()
  isRegisteredWithGoogle?: boolean;
}
