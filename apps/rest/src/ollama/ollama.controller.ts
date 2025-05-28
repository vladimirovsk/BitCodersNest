import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OllamaService } from './ollama.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('Chat')
@Controller('chat')
export class OllamaController {
	constructor(
		private readonly ollamaService: OllamaService, // Inject the service that handles chat logic
	) {

	}


	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get chat message' })
	@Get('')
	async getChatRequest(@Query('message') message: string): Promise<String> {
		const result = await this.ollamaService.queryOllama(message);
		console.log('Received message:', message, result);
		return result; // For now, just return the request as a placeholder
	}
}
