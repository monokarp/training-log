import { Prisma } from '@api/data/prisma';
import { Test } from '@contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	constructor(private prisma: Prisma) {}

	getData(): Promise<Test[]> {
		return this.prisma.test.findMany();
	}
}
