import { Body, Controller, Get } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AccountLogin } from '../../../../libs/contracts';

@Controller('rate')
export class RateController {

  @Get()
  async getAll(){
    console.log("/rate/test")
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async getRateRMQ(@Body() dto : AccountLogin.Request): Promise<AccountLogin.Response> {
    console.log(JSON.stringify(dto));
    return {access_token: 'data null'};
  }


  @Get('/list')
  async getRateList(){
    return {rate: 0}
  }
}