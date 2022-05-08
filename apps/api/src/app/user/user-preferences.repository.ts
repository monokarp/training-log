import { Injectable } from '@nestjs/common';
import { UserPreferences } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class UserPreferencesRepository {
	constructor(private prisma: Prisma) {}

	public one(id: string): Promise<UserPreferences | null> {
		return this.prisma.userPreferences.findUnique({ where: { userId: id } });
	}
}
