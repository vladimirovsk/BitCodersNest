import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectModel } from './project.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectModel)
    private projectModel: ModelType<ProjectModel>,
  ) {
  }

  async create(createUserDto: CreateProjectDto): Promise<ProjectModel> {
    const createProject = new this.projectModel(createUserDto);
    return await createProject.save();
  }

  async findByProjectId(id: string): Promise<ProjectModel | null> {
    return await this.projectModel.findById(id).exec();
  }

  async findAll(): Promise<ProjectModel[]> {
    return await this.projectModel.find().exec();
  }
}
