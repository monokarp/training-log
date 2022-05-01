import { Test } from '@contracts';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('test')
	getData(): Promise<Test[]> {
		return this.appService.getData();
	}
}
