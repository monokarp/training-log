import { Injectable } from '@nestjs/common';
import { TranslationData, UpdateTranslation, WithUser } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class I18nRepository {
	constructor(private prisma: Prisma) {}

	public translationsFor(userId: string): Promise<TranslationData[]> {
		return this.prisma.translation.findMany({
			select: {
				localeCode: true,
				code: true,
				value: true,
			},
			where: { userId },
		});
	}

	public locales(): Promise<{ code: string }[]> {
		return this.prisma.locale.findMany({ select: { code: true } });
	}

	public async upsertOne(data: WithUser<UpdateTranslation>): Promise<boolean> {
		const entity = await this.prisma.translation.findUnique({
			where: {
				userId_code_localeCode: {
					userId: data.userId,
					localeCode: data.localeCode,
					code: data.code,
				},
			},
		});

		if (!entity) {
			await this.prisma.translation.create({ data });

			return true;
		}

		await this.prisma.translation.update({
			where: {
				userId_code_localeCode: {
					userId: data.userId,
					localeCode: data.localeCode,
					code: data.code,
				},
			},
			data,
		});

		return false;
	}
}
