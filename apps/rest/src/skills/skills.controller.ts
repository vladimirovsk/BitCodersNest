import { Body, Controller, Get, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skills } from './skills.model';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('skills')
export class SkillsController {
	constructor(
		private readonly skillsService: SkillsService,
	) {
	}

	@Get()
	async getSkills() {
		return this.skillsService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create skills ' })
	@UsePipes(new ValidationPipe())
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Returned is OK',
	})
	@Post()
	async createSkill(@Body() skillDto: Skills,) {
		return this.skillsService.create(skillDto);
	}
}
