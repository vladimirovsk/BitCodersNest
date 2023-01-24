import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './project.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create project ' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return await this.projectService.create(createProjectDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @Get('/')
  async getAllProject(@UserEmail() user: string) {
    const project = await this.projectService.findAll();
    if (!project) {
      throw new HttpException('Projects not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @Get(':id')
  async getProjectById(@UserEmail() user: string, @Param('id') id: string) {
    const project = await this.projectService.findByProjectId(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  @ApiOperation({ summary: 'Delete project by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returned is OK',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProject() {
    return { error: 'developing...'};
  }
}
