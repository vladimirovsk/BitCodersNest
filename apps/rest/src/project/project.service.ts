import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectModel } from './project.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(ProjectModel)
    private projectModel: ModelType<ProjectModel>,
  ) {}

  async create(createUserDto: CreateProjectDto): Promise<ProjectModel> {
    const createProject = new this.projectModel(createUserDto);
    return await createProject.save();
  }

  async findByProjectId(id: string): Promise<ProjectModel | null> {
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
