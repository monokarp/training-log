import { Injectable } from '@nestjs/common';
import { Trainee } from '@prisma/client';
import { Prisma } from '../shared/prisma';

@Injectable()
export class TraineeService {
	constructor(private prisma: Prisma) {}

	public getData(): Promise<Trainee[]> {
		return this.prisma.trainee.findMany();
	}
}
