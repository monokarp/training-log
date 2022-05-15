import { Injectable } from '@nestjs/common';
import { LocaleCode } from '@training-log/contracts';
import { Prisma } from './prisma';

export const MissingTranslation = 'N/A';

@Injectable()
export class I18n {
	constructor(private prisma: Prisma) {}

	public async translate(userId: string, code: string, locale = LocaleCode.Default): Promise<string> {
		const translation = await this.prisma.translation.findUnique({
			where: {
				userId_code_localeCode: { userId, code, localeCode: locale },
			},
		});

		return translation?.value ?? MissingTranslation;
	}
}
