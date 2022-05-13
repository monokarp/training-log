import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { CreatePersonalBestData, PersonalBest } from '@training-log/contracts';
import { PersonalBestService } from './personal-best.service';

@Controller('personal-best')
export class PersonalBestController {
	constructor(private personalBestService: PersonalBestService) {}

	@Get(':username')
	forTrainee(@Param('username') username: string): Promise<PersonalBest[]> {
		return this.personalBestService.for(username);
	}

	@Put()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() body: { data: CreatePersonalBestData }): Promise<number> {
		return this.personalBestService.create(body.data);
	}

	@Delete()
	public async delete(@Body() id: number): Promise<boolean> {
		await this.personalBestService.delete(id);

		return true;
	}
}
