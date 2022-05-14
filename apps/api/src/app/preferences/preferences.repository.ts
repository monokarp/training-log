import { Injectable } from '@nestjs/common';
import { PreferencesUpdateData, UserPreferences } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class PreferencesRepository {
	constructor(private prisma: Prisma) {}

	public async for(userId: string): Promise<UserPreferences> {
		const prefs = await this.prisma.userPreferences.findUnique({ where: { userId } });

		if (!prefs) {
			throw new Error(`No preferences for user ${userId}`);
		}

		return prefs;
	}

	public async updateOne(data: PreferencesUpdateData): Promise<void> {
		await this.prisma.userPreferences.update({ where: { userId: data.userId }, data });
	}
}
