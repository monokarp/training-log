import { Module } from '@nestjs/common';
import { I18n } from './i18n';
import { Prisma } from './prisma';

@Module({
	imports: [],
	controllers: [],
	exports: [Prisma, I18n],
	providers: [Prisma, I18n],
})
export class SharedModule {}
