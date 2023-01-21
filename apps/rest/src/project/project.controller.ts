import {
	Body,
	Controller,
	Delete,
	Get, HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectModel } from './project.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@ApiTags('project')
@Controller('project')
export class ProjectController {
	constructor(
		private projectService:ProjectService
	) {
	}

	@ApiOperation({ summary: 'Create project ' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Returned is OK',
		type: Promise<ProjectModel>
	})
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async createProject(@Body() createProjectDto: CreateProjectDto):Promise<ProjectModel>{
			return await this.projectService.create(createProjectDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get('/')
	async getAllProject(@UserEmail() user:string){
		const projects =  await this.projectService.findAll();
		if (!projects) {throw new HttpException('Projects not found', HttpStatus.NOT_FOUND)}
		return projects;
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getProjectById(@UserEmail() user:string, @Param('id') id: string){
		const project = await this.projectService.findByProjectId(id);
		if (!project) {throw new HttpException('Project not found', HttpStatus.NOT_FOUND)}
		return project
	}

	@Delete()
	async deleteProject(){

	}

}