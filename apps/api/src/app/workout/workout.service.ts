import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';
import { Prisma } from '../shared/prisma';

@Injectable()
export class WorkoutService {
	constructor(private prisma: Prisma) {}

	public including1RMs(traineeId: number): Promise<Workout[]> {
		return this.prisma.workout.findMany({
			where: { traineeId },
			include: {
				Set: {
					include: {
						Exercise: true,
						OneRepMax: true,
					},
				},
			},
		});
	}
}
