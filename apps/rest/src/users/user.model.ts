import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ collection: 'user' })
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);
