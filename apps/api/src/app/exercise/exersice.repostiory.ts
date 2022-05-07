import { Injectable } from '@nestjs/common';
import { Exercise } from '@training-log/contracts';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

@Injectable()
export class ExerciseRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async including1RMs(username: string): Promise<Exercise[]> {
		const trainee = await this.prisma.trainee.findUnique({ where: { username } });

		if (!trainee) {
			return [];
		}

		const exercises = await this.prisma.exercise.findMany({
			include: {
				OneRepMax: {
					where: {
						traineeId: trainee.id,
					},
					orderBy: {
						starting: 'desc',
					},
				},
			},
		});

		return Promise.all(
			exercises.map(async one => {
				const [current1rm] = one.OneRepMax;

				const result: Exercise = {
					code: one.nameCode,
					name: await this.i18n.translate(one.nameCode),
				};

				if (current1rm) {
					result.oneRepMax = {
						value: current1rm.value,
						unit: current1rm.unit,
						starting: current1rm.starting.toISOString(),
					};
				}

				return result;
			}),
		);
	}
}
