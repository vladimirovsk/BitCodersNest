import {IsString} from 'class-validator';
export class CreateProjectDto {

	@IsString()
	title: string;

	@IsString()
	ico: string;

	@IsString()
	img: string;

	@IsString()
	note: string;
}