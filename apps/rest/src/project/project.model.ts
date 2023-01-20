import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProjectModel extends Base {}
export class ProjectModel {
	@prop()
  title: string;

  @prop()
  ico: string;

  @prop()
  img: string;

  @prop()
  note: string;
}
