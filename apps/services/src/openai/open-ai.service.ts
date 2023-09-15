import { OpenAI } from 'openai';
import { HttpException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as process from 'process';
import axios from 'axios';

@Injectable()
export class OpenAiService implements OnModuleInit {
	private logger = new Logger(OpenAiService.name)
  private CHAT_GPT_MODEL = 'gpt-3.5-turbo'//'gpt-3.5-turbo';

	private configuration =  {
		apiKey: <string>process.env.OPENAI_API_KEY,
		organization: process.env.OPENAI_ORGANIZATION_ID
	}
	private openai = new OpenAI(this.configuration);
	//private response = await this.openai.listEngines();

  constructor() {
  }

  onModuleInit() {
    const result = this.generateText('Test message').then((result) => {
      this.logger.log(result);
      return result;
    })
	    .catch(err=>{
		    this.logger.error(err.message);
	    })
  }

  async generateText(message: string) {
    const complete = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
			temperature: 0.1,
      model: this.CHAT_GPT_MODEL,
    });
  }

  // async generateText(message: string) {
  //   //try {
  //     const response = await axios.post(
  //       'https://api.openai.com/v1/completions',
  //       {
	//         messages: [{ role: 'user', content: message }],
  //         model: this.CHAT_GPT_MODEL,
  //         temperature: 0.7,
  //         // max_tokens: 100,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${this.configuration.apiKey}`,
  //         },
  //       },
  //     );
  //   //  return response.data;
  //   //} catch (error) {
  //   //  throw new HttpException('Error generateText', error.message);
  //   //}
  // }
}
