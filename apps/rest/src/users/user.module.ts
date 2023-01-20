import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
   imports:[
     TypegooseModule.forFeature([
      {
        typegooseClass:UserModel,
        schemaOptions: { collection: 'user' }
      }
      ]),
   ],
   providers:[UserService],
   controllers:[UserController],
   exports: [UserService]
})

export class UserModule {

}