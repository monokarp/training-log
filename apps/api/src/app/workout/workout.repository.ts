import { Injectable } from '@nestjs/common';
import { CreateWorkoutData, Workout } from '@training-log/contracts';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

@Injectable()
export class WorkoutRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async including1RMs(username: string): Promise<Workout[]> {
		const data = await this.prisma.workout.findMany({
			where: { userId: username },
			include: {
				WorkItem: {
					include: {
						ExerciseType: {
							include: {
								PersonalBest: {
									orderBy: {
										starting: 'desc',
									},
								},
							},
						},
					},
				},
			},
		});

		return Promise.all(
			data.map(async workout => {
				return {
					date: workout.date,
					comment: workout.comment,
					sets: await Promise.all(
						workout.WorkItem.map(async workItem => {
							const [pb] = workItem.ExerciseType.PersonalBest;

							return {
								exerciseName: await this.i18n.translate(
									username,
									workItem.ExerciseType.translationCode,
								),
								order: workItem.order,
								sets: workItem.sets,
								reps: workItem.reps,
								weight: workItem.weight,
								comment: workItem.comment,
								personalBest: pb?.weight ?? null,
							};
						}),
					),
				};
			}),
		);
	}

	public async create(data: CreateWorkoutData): Promise<boolean> {
		const newWorkout = await this.prisma.workout.create({
			data: {
				userId: data.userId,
				date: data.date,
				comment: data.comment,
			},
		});

		await Promise.all(
			data.sets.map(async set => {
				await this.prisma.workItem.createMany({
					data: [
						{
							workoutId: newWorkout.id,
							userId: data.userId,
							exerciseId: set.exerciseId,
							order: set.order,
							sets: set.sets,
							reps: set.reps,
							weight: set.weight,
							comment: set.comment,
						},
					],
				});
			}),
		);

		return true;
	}
}
