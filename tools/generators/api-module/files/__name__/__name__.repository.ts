import { Injectable } from '@nestjs/common';
import { Prisma } from '../shared/prisma';

@Injectable()
export class <%= pascal(name) %>Repository {
	constructor(private prisma: Prisma) {}
}
