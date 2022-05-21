import { Injectable } from '@nestjs/common';
import { NewPersonalBest, PersonalBest } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class PersonalBestRepository {
	constructor(private prisma: Prisma) {}

	public for(username: string): Promise<PersonalBest[]> {
		return this.prisma.personalBest.findMany({
			select: {
				id: true,
				weight: true,
				starting: true,
				exerciseId: true,
			},
			where: {
				userId: username,
			},
		});
	}

	public async create(data: NewPersonalBest): Promise<number> {
		const res = await this.prisma.personalBest.create({ data });

		return res.id;
	}

	public async delete(id: number): Promise<string | null> {
		await this.prisma.personalBest.delete({ where: { id } });
		return null;
	}
}
