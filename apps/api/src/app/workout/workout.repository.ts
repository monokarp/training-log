import { CreateWorkoutData, Workout } from '@training-log/contracts';
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
			orderBy: { date: 'desc' },
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
				date: one.date.toISOString(),
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

	public async create(data: CreateWorkoutData): Promise<boolean> {
		const trainee = await this.prisma.trainee.findFirst({ where: { username: data.traineeUsername } });

		if (!trainee) {
			return false;
		}

		const newWorkout = await this.prisma.workout.create({
			data: {
				date: new Date(data.date),
				traineeId: trainee.id,
			},
		});

		const sets = await Promise.all(
			// TODO rework schema holy cringe
			data.sets.map(async one => {
				const exercise = await this.prisma.exercise.findFirst({
					where: {
						nameCode: one.name,
					},
				});

				const oneRM = await this.prisma.oneRepMax.findFirst({
					where: {
						traineeId: trainee.id,
						exerciseId: exercise?.id ?? 0,
					},
				});

				return {
					oneRepMaxId: oneRM?.id ?? 0,
					exerciseId: exercise?.id ?? 0,
					workoutId: newWorkout.id,
					order: one.order,
					multiple: one.multiple,
					reps: one.reps,
					weight: one.weight,
				};
			}),
		);

		await this.prisma.set.createMany({
			data: sets,
		});

		return true;
	}
}
