import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty({
    default:
      '000000ciOiJI00000000nR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWRpbWlyb3Zza0BnbWFp0000CJpYXQiOjE2NzQ2NDg2NzB9.00000K4hsJxZL--Jn7P4KWBCQZ_1Rlr00000jZjR0wDc',
  })
  access_token: string;
}
