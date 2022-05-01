import { Module } from '@nestjs/common';
import { Prisma } from './prisma';

@Module({
	imports: [],
	controllers: [],
	exports: [Prisma],
	providers: [Prisma],
})
export class DataModule {}
