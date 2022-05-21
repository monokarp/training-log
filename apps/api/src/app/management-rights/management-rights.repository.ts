import { Injectable } from '@nestjs/common';
import { ManagementRight } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class ManagementRightsRepository {
	constructor(private prisma: Prisma) {}

	public async managementRights(id: string): Promise<ManagementRight[]> {
		return this.prisma.traineeManagementRights.findMany({
			select: { ownerId: true, targetId: true },
			where: {
				OR: [{ ownerId: id }, { targetId: id }],
			},
		});
	}

	public async add(one: ManagementRight): Promise<void> {
		await this.prisma.traineeManagementRights.create({ data: one });
	}

	public async revoke(one: ManagementRight): Promise<void> {
		await this.prisma.traineeManagementRights.delete({
			where: {
				ownerId_targetId: one,
			},
		});
	}
}
