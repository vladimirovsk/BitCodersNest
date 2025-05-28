import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OllamaService {

	constructor(
		private readonly httpService: HttpService,
	) {
	}

	async queryOllama(prompt: string): Promise<string> {
		const url = 'http://localhost:11434/api/generate';
		const data = {
			model: 'developer-ru:latest', // Укажите вашу модель, например, llama3.1
			prompt: prompt,
			stream: false, // Отключаем потоковую передачу для получения полного ответа
		};

		try {
			const response = await firstValueFrom(
				this.httpService.post(url, data, {
					headers: { 'Content-Type': 'application/json' },
				}),
			);
			return response.data.response;
		} catch (error) {
			throw new Error(`Failed to query Ollama: ${error.message}`);
		}
	}
}
