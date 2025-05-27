import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger(AppService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

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
      return response.data.response; // Ответ от модели
    } catch (error) {
      throw new Error(`Failed to query Ollama: ${error.message}`);
    }
  }

  async onModuleInit() {
     const result = await this.queryOllama('Hello, how are you?');
      this.logger.verbose(`Ollama response: ${result}`);
  }
}
