import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { PersonalBest } from '@training-log/contracts';
import { CreatePersonalBestDTO } from './dto/create-pb';
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
	public async create(@Body() body: CreatePersonalBestDTO): Promise<number> {
		return this.personalBestService.create(body);
	}

	@Delete()
	public async delete(@Body() id: number): Promise<boolean> {
		await this.personalBestService.delete(id);

		return true;
	}
}
