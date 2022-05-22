import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { PersonalBest } from '@training-log/contracts';
import { CoachOnly } from '../auth/guards/coach-only';
import { CreatePersonalBestDTO } from './dto/create-pb';
import { PersonalBestService } from './personal-best.service';

@Controller(':userId/personal-best')
export class PersonalBestController {
	constructor(private personalBestService: PersonalBestService) {}

	@Get()
	forTrainee(@Param('userId') userId: string): Promise<PersonalBest[]> {
		return this.personalBestService.for(userId);
	}

	@Put()
	@UseGuards(CoachOnly)
	@HttpCode(HttpStatus.CREATED)
	public async create(@Param('userId') userId: string, @Body() body: CreatePersonalBestDTO): Promise<number> {
		return this.personalBestService.create({ userId, ...body });
	}

	@Delete()
	@UseGuards(CoachOnly)
	public async delete(@Body() id: number): Promise<boolean> {
		await this.personalBestService.delete(id);

		return true;
	}
}
