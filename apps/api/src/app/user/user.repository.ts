import { Injectable } from '@nestjs/common';
import { User } from '@training-log/contracts';
import { Prisma } from '../shared/prisma';

@Injectable()
export class UserRepository {
	constructor(private prisma: Prisma) {}

	public one(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}
}
