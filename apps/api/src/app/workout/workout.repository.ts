import { Workout } from '@training-log/contracts';
import { Injectable } from '@nestjs/common';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

@Injectable()
export class WorkoutRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async including1RMs(username: string): Promise<Workout[]> {
		const trainee = await this.prisma.trainee.findUnique({ where: { username } });

		if (!trainee) {
			return [];
		}

		const data = await this.prisma.workout.findMany({
			where: { traineeId: trainee.id },
			include: {
				Set: {
					include: {
						Exercise: true,
						OneRepMax: true,
					},
				},
			},
		});

		return Promise.all(
			data.map(async one => ({
				date: one.date,
				comment: one.comment ?? undefined,
				sets: await Promise.all(
					one.Set.map(async one => ({
						exerciseName: await this.i18n.translate(one.Exercise.nameCode),
						oneRepMax: one.OneRepMax.value,
						order: one.order,
						multiple: one.multiple,
						reps: one.reps,
						weight: one.weight,
						unit: one.unit,
						isWorkSet: one.isWorkSet,
						comment: one.comment ?? undefined,
					})),
				),
			})),
		);
	}
}
