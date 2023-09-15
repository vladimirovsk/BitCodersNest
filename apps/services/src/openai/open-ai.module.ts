import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiService } from './open-ai.service';

@Module({
	imports: [ConfigModule],
	providers: [OpenAiService],
	exports: [OpenAiService],
})
export class OpenAiModule {}