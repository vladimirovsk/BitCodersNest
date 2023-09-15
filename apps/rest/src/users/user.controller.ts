import {
  Body,
  Controller,
  Get, HttpCode, HttpException,
  HttpStatus,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserSelectDto } from './dto/user-select.dto';
import { UserEmail } from '../decorators/user-email.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @Get('/')
  async getAllUsers(@UserEmail() user: string) {
    const users = await this.userService.findAll();
    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async insertUser(@Body() dto: CreateUserDto) {
    return dto;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modify user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @HttpCode(HttpStatus.OK)
  @Put()
  async updateUser(@Body() dto: UpdateUserDto) {
    return dto;
  }
}
