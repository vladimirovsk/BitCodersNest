import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from './user.model';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/user-create.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getByEmailOneUserWithPassword(email: string): Promise<User | null> {
    return this.userModel
      .findOne(
        { email },
        {
          _id: false,
          email: true,
          isRegisteredWithGoogle: true,
          password: true,
        },
      )
      .lean();
  }

  async getByEmailOneUser(email: string): Promise<User | null> {
    return this.userModel
      .findOne(
        { email },
        {
          _id: false,
          email: true,
          isRegisteredWithGoogle: true,
        },
      )
      .lean();
  }

  async getByEmail(email: string): Promise<User[] | null> {
    const user = await this.userModel.find(
      { email },
      {
        _id: true,
        email: true,
        isRegisteredWithGoogle: true,
      },
    );
    if (!user) {
      {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
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
      password: await hash(dto.password, salt),
    });

    await createUser.save();

    return {
      email: createUser.email,
      isRegisteredWithGoogle: createUser.isRegisteredWithGoogle,
    };
  }
}
