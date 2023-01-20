import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService
  ) {
  }

  @Get('/')
  async userInfo(){
    return {user:'userInfo'}
  }

  @Get('/list')
  async listUser(){
    return {name:'test'}
  }

  @Post()
  async insertUser(@Body() dto: CreateUserDto){
    return dto;
  }

  @Put()
  async updateUser(@Body() dto:UpdateUserDto){
    return dto;
  }
}
