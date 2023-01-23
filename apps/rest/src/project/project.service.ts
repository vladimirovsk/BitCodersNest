import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.model';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
  ) {}

  async create(createUserDto: CreateProjectDto): Promise<Project> {
    const createProject = new this.projectModel(createUserDto);
    return await createProject.save();
  }

  async findByProjectId(id: string): Promise<Project | null> {
    return await this.projectModel.findById(id).exec();
  }

  async findAll() {
    //Promise<ProjectModel[]>
    const strConfig = `mongodb://${this.configService.get(
      'MONGO_USER',
    )}:${this.configService.get('MONGO_PASSWORD')}@${this.configService.get(
      'MONGO_HOST',
    )}:${this.configService.get('MONGO_PORT')}/${this.configService.get(
      'MONGO_DB',
    )}`;

    const result = await this.projectModel.find().exec();
    return {
      strConfig,
      result,
    };
  }
}
