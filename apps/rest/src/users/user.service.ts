import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/user-create.dto';
import { ModelType } from "typegoose";

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name)

  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>
  ) {
  }

  async getByEmail(email: string):Promise<UserModel | null>  {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      {throw new HttpException('User not found', HttpStatus.NOT_FOUND)}
    }
    return user;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    // const user = await this.userModel.findByIdAndUpdate(userId,
    // await this.userModel. update(userId, {
    //   currentHashedRefreshToken
    // });
  }

  async create(dto: CreateUserDto) {
    const salt = await genSalt(10);
    const createUser = new this.userModel({
      email: dto.login,
      password: await hash(dto.password, salt)
    });
    return await createUser.save();
  }

}