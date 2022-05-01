import { Module } from '@nestjs/common';
import { Prisma } from '@api/data/prisma';

@Module({
	imports: [],
	controllers: [],
	exports: [Prisma],
	providers: [Prisma],
})
export class DataModule {}
