import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skills, SkillsSchema } from './skills.model';

@Module({
	imports: [
		MongooseModule.forFeature([
		{
			name: Skills.name,
			schema: SkillsSchema,
		},
	]),
	],
	providers: [SkillsService],
	controllers: [SkillsController],
	exports: [SkillsService]
})
export class SkillsModule {}
