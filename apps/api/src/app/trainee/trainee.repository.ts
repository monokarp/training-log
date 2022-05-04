import { Injectable } from '@nestjs/common';
import { Trainee } from '@contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class TraineeRepository {
	constructor(private prisma: Prisma) {}

	public many(): Promise<Trainee[]> {
		return this.prisma.trainee.findMany({
			select: {
				name: true,
				username: true,
			},
		});
	}
}
