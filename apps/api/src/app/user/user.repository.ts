import { Injectable } from '@nestjs/common';
import { User, UserWithPreferences } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class UserRepository {
	constructor(private prisma: Prisma) {}

	public one(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	public async passwordHash(id: string): Promise<string | null> {
		const data = await this.prisma.user.findUnique({ select: { password: true }, where: { id } });

		return data ? data.password : null;
	}

	public async withPreferences(id: string): Promise<{ user: UserWithPreferences; pw: string } | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: { UserPreferences: true },
		});

		if (!user?.UserPreferences) {
			return null;
		}

		return {
			user: {
				id: user.id,
				name: user.name,
				unit: user.UserPreferences.unit,
				localeCode: user.UserPreferences.localeCode,
			},
			pw: user.password,
		};
	}
}
