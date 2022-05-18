import { Injectable } from '@nestjs/common';
import { User, UserFullData, UserWithPreferences } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';
import { isNotNull } from '@training-log/shared';

@Injectable()
export class UserRepository {
	constructor(private prisma: Prisma) {}

	public one(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	public async withPreferences(id: string): Promise<UserWithPreferences | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: { UserPreferences: true },
		});

		if (!user?.UserPreferences) {
			return null;
		}

		return {
			id: user.id,
			name: user.name,
			unit: user.UserPreferences.unit,
			localeCode: user.UserPreferences.localeCode,
		};
	}

	public async fullData(id: string): Promise<UserFullData | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				UserPreferences: true,
				TraineeManagementRights: true,
			},
		});

		if (!user?.UserPreferences) {
			return null;
		}

		return {
			id: user.id,
			name: user.name,
			unit: user.UserPreferences.unit,
			localeCode: user.UserPreferences.localeCode,
			password: user.password,
			trainees: (
				await Promise.all(user.TraineeManagementRights.map(one => this.withPreferences(one.targetId)))
			).filter(isNotNull),
		};
	}
}
