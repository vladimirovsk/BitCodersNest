import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Frameworks {
  @Prop({ type: String })
  name: string
}

export type SkillsDocument = Skills & Document;
@Schema({
  collection: 'skills',
})
export class Skills {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  subheader: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: Boolean, default: false})
  hidden: boolean

  @Prop({ type: Boolean, default: false})
  disabled: boolean

  @Prop({ type: Array<Frameworks> })
  frameworks: Frameworks[]
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
