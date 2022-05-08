import { Injectable } from '@nestjs/common';
import { ExerciseType, ExerciseWithPB } from '@training-log/contracts';
import { I18n } from '../shared/i18n';
import { Prisma } from '../shared/prisma';

@Injectable()
export class ExerciseRepository {
	constructor(private prisma: Prisma, private i18n: I18n) {}

	public async all(userId: string): Promise<ExerciseType[]> {
		const exercises = await this.prisma.exerciseType.findMany({
			where: { userId },
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
}
