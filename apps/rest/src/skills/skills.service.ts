import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skills } from './skills.model';

@Injectable()
export class SkillsService {
	constructor(
		@InjectModel(Skills.name)
		private skillsModel: Model<Skills>,
	) {}

	async create(createSkillDto: Skills): Promise<Skills> {
		const createSkill = new this.skillsModel(createSkillDto);
		return await createSkill.save();
	}

	async findAll(): Promise<Skills[]> {
		return this.skillsModel.find().exec();
	}
}
