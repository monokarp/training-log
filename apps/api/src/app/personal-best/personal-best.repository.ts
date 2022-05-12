import { Injectable } from '@nestjs/common';
import { PersonalBest } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class PersonalBestRepository {
	constructor(private prisma: Prisma) {}

	public async byUserAndExerise(username: string, exerciseId: string): Promise<PersonalBest[]> {
		return this.prisma.personalBest.findMany({
			select: {
				weight: true,
				starting: true,
			},
			where: {
				userId: username,
				exerciseId,
			},
		});
	}
}
