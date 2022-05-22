import { Body, Controller, Get, HttpStatus, Param, Put, Res, UseGuards } from '@nestjs/common';
import { TranslationData } from '@training-log/contracts';
import { CoachOnly } from '../auth/guards/coach-only';
import { FastifyResponse } from '../fastify-response.type';
import { UpdateTranslationDTO } from './dto/update-translation';
import { I18nService } from './i18n.service';

@Controller(':userId/i18n')
export class I18nController {
	constructor(private i18nService: I18nService) {}

	@Get('translations')
	public translationsFor(@Param('userId') userId: string): Promise<TranslationData[]> {
		return this.i18nService.translationsFor(userId);
	}

	@Get('locales')
	public locales(): Promise<string[]> {
		return this.i18nService.locales();
	}

	@Put('translations')
	@UseGuards(CoachOnly)
	public async updateOne(
		@Param('userId') userId: string,
		@Body() body: UpdateTranslationDTO,
		@Res() res: FastifyResponse,
	): Promise<void> {
		const createdNew = await this.i18nService.upsertOne({ userId, ...body });

		res.status(createdNew ? HttpStatus.CREATED : HttpStatus.OK).send();
	}
}
