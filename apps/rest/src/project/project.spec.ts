import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { getModelToken } from 'nestjs-typegoose';
import { Types } from 'mongoose';

describe('ProjectController', ()=> {
  let projectService: ProjectService;

  const exec = { exec: jest.fn() };
  const projectRepositoryFactory = () => ({
    find: ()=> exec
  });

  beforeEach(async () =>{
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectService,
        {useFactory: projectRepositoryFactory, provide: getModelToken('ProjectModel')}
      ],
    }).compile();

    projectService = moduleRef.get<ProjectService>(ProjectService);
  });

  it('Should return an array of project', async () => {
    expect(projectService).toBeDefined();
  })

  it('Should find project by id ', async () => {
    const id = new Types.ObjectId().toHexString();
    projectRepositoryFactory().find().exec.mockReturnValueOnce({id})
    const res = await projectService.findByProjectId(id);
    expect(res).toBeDefined();
  })

});