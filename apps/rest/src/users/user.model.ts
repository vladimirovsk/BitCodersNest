import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserModelDocument = UserModel & Document;
export class UserModel {
  @Prop()
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop({ default: false })
  isRegisteredWithGoogle: boolean;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
