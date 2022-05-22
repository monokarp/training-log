import { Injectable } from '@nestjs/common';
import { ExerciseType, PersonalBest, WorkItem, Workout as PrismaWorkout } from '@prisma/client';
import { NewWorkout, Workout, Set, WithUser } from '@training-log/contracts';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

type FullWorkout = PrismaWorkout & {
	WorkItem: FullWorkItem[];
};

type FullWorkItem = WorkItem & {
	ExerciseType: ExerciseType & {
		PersonalBest: PersonalBest[];
	};
};

@Injectable()
export class WorkoutRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async one(id: number): Promise<Workout | null> {
		const data = await this.prisma.workout.findUnique({
			where: { id },
			include: {
				WorkItem: {
					orderBy: { order: 'asc' },
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
				User: true,
			},
		});

		return data ? this.mapWorkout(data, data.User.id) : null;
	}

	public async including1RMs(username: string): Promise<Workout[]> {
		const data = await this.prisma.workout.findMany({
			where: { userId: username },
			orderBy: { date: 'asc' },
			include: {
				WorkItem: {
					orderBy: { order: 'asc' },
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

		return Promise.all(data.map(async workout => this.mapWorkout(workout, username)));
	}

	public async create(data: WithUser<NewWorkout>): Promise<number> {
		const newWorkout = await this.prisma.workout.create({
			data: {
				userId: data.userId,
				date: data.date,
				comment: data.comment,
				WorkItem: {
					createMany: {
						data: data.sets.map(set => ({
							userId: data.userId,
							exerciseId: set.exerciseId,
							order: set.order,
							sets: set.sets,
							reps: set.reps,
							weight: set.weight,
							comment: set.comment,
						})),
					},
				},
			},
		});

		return newWorkout.id;
	}

	private async mapWorkout(workout: FullWorkout, username: string): Promise<Workout> {
		return {
			date: workout.date,
			comment: workout.comment,
			sets: await Promise.all(
				workout.WorkItem.map(async (workItem: FullWorkItem) => this.mapSet(workItem, username)),
			),
		};
	}

	private async mapSet(workItem: FullWorkItem, username: string): Promise<Set> {
		const [pb] = workItem.ExerciseType.PersonalBest;

		return {
			exerciseName: await this.i18n.translate(username, workItem.ExerciseType.translationCode),
			order: workItem.order,
			sets: workItem.sets,
			reps: workItem.reps,
			weight: workItem.weight,
			comment: workItem.comment,
			personalBest: pb?.weight ?? null,
		};
	}
}
