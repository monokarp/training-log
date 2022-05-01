import { Test } from '@contracts';
import { Injectable } from '@nestjs/common';
import { Prisma } from './data/prisma';

@Injectable()
export class AppService {
	constructor(private prisma: Prisma) {}

	getData(): Promise<Test[]> {
		return this.prisma.test.findMany();
	}
}
