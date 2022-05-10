import { Injectable } from '@nestjs/common';
import { DeleteExerciseData, ExerciseType, ExerciseWithPB, NewExerciseData } from '@training-log/contracts';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

@Injectable()
export class ExerciseRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async all(userId: string): Promise<ExerciseType[]> {
		const exercises = await this.prisma.exerciseType.findMany({
			where: { userId },
			orderBy: { id: 'asc' },
		});

		return Promise.all(
			exercises.map(async one => ({
				id: one.id,
				userId,
				name: await this.i18n.translate(userId, one.translationCode),
			})),
		);
	}

	public async allIncludingPBs(userId: string): Promise<ExerciseWithPB[]> {
		const exerciseTypesWithPB = await this.prisma.exerciseType.findMany({
			where: { userId },
			include: {
				PersonalBest: {
					orderBy: {
						starting: 'desc',
					},
				},
			},
		});

		return Promise.all(
			exerciseTypesWithPB.map(async one => ({
				id: one.id,
				userId,
				name: await this.i18n.translate(userId, one.translationCode),
				personalBest: one.PersonalBest[0]?.weight ?? null,
				personalBestFrom: new Date(one.PersonalBest[0]?.starting) ?? null,
			})),
		);
	}

	public async create(data: NewExerciseData): Promise<string> {
		await this.prisma.translation.create({
			data: {
				userId: data.userId,
				localeCode: data.localeCode,
				code: data.id,
				value: data.name,
			},
		});

		const newEntity = await this.prisma.exerciseType.create({
			data: {
				id: data.id,
				userId: data.userId,
				translationCode: data.id,
			},
		});

		return newEntity.id;
	}

	public async delete(data: DeleteExerciseData): Promise<boolean> {
		const entity = await this.prisma.exerciseType.findUnique({
			where: {
				userId_id: data,
			},
			include: {
				PersonalBest: { select: { id: true } },
				WorkItem: { select: { id: true } },
			},
		});

		if (!entity) {
			return true;
		}

		if (entity.WorkItem.length) {
			throw new Error(`This exercise is referred to by ${entity.WorkItem.length} existing workouts`);
		}

		await this.prisma.$transaction([
			this.prisma.exerciseType.delete({
				where: {
					userId_id: data,
				},
			}),
			this.prisma.personalBest.deleteMany({
				where: {
					id: { in: entity.PersonalBest.map(one => one.id) },
				},
			}),
			this.prisma.translation.deleteMany({
				where: {
					userId: data.userId,
					code: data.id,
				},
			}),
		]);

		return true;
	}
}
