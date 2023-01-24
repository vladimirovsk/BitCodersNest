import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;
@Schema({
  collection: 'project',
})
export class Project {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  ico: string;

  @Prop({ type: String })
  img: string;

  @Prop({ type: String })
  note: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
