import {Module} from '@nestjs/common';
import {ProjectModel} from './project.model';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import { TypegooseModule } from 'nestjs-typegoose';


@Module({
	imports:[
		TypegooseModule.forFeature([
			{
				typegooseClass:ProjectModel,
				schemaOptions: { collection: 'project' }
			}
		]),
	],
	providers: [ProjectService],
	controllers:[ProjectController]

})
export class ProjectModule {

};