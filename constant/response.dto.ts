import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ResponseHttp {
  export namespace Error {
    export class NotFound {
      @ApiProperty({ default: 401 })
      statusCode: number;

      @ApiProperty({ default: 'Not Found' })
      message: string;

      @ApiProperty({ default: 'Unauthorized' })
      error: string;
    }
  }
}
