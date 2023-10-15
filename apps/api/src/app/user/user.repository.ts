import { Injectable } from '@nestjs/common';
import { User, UserFullData, UserWithPreferences } from '@training-log/contracts';
import { isNotNull } from '@training-log/shared';
import { Prisma } from '../shared/prisma';

@Injectable()
export class UserRepository {
	constructor(private prisma: Prisma) { }

	public async create(data: User & { password: string }): Promise<void> {
		await this.prisma.user.create({ data });
	}

	public one(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ select: { id: true, name: true }, where: { id } });
	}

	public many(ids: string[]): Promise<User[]> {
		return this.prisma.user.findMany({ select: { id: true, name: true }, where: { id: { in: ids } } });
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
