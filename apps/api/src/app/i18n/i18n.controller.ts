import { Body, Controller, Get, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { TranslationData, UpdateTranslationData } from '@training-log/contracts';
import { FastifyResponse } from '../fastify-response.type';
import { I18nService } from './i18n.service';

@Controller('i18n')
export class I18nController {
	constructor(private i18nService: I18nService) {}

	@Get('translations/:userId')
	public translationsFor(@Param('userId') userId: string): Promise<TranslationData[]> {
		return this.i18nService.translationsFor(userId);
	}

	@Get('locales')
	public locales(): Promise<string[]> {
		return this.i18nService.locales();
	}

	@Put('translations')
	public async updateOne(@Body() body: UpdateTranslationData, @Res() res: FastifyResponse): Promise<void> {
		const createdNew = await this.i18nService.upsertOne(body);

		res.status(createdNew ? HttpStatus.CREATED : HttpStatus.OK).send();
	}
}
