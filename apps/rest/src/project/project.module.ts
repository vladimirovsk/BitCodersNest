import { Module } from '@nestjs/common';
import { Project, ProjectSchema } from './project.model';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleSpreadsheetModule } from '../../../../helpers/google-spreadsheet/google-spreadsheet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    GoogleSpreadsheetModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
