import { Injectable } from '@nestjs/common';
import { PreferencesUpdateData, User, UserPreferences, UserWithPreferences } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

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
}
