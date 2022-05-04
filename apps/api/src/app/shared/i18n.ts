import { Locale } from '@training-log/contracts';
import { Injectable } from '@nestjs/common';
import { Prisma } from './prisma';

export const MissingTranslation = 'N/A';

@Injectable()
export class I18n {
	constructor(private prisma: Prisma) {}

	public async translate(code: string, locale = Locale.Default): Promise<string> {
		const translation = await this.prisma.translation.findUnique({
			where: {
				localeCode_code: { localeCode: locale, code },
			},
		});

		return translation?.value ?? MissingTranslation;
	}
}
