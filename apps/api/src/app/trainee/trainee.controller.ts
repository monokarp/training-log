import { Trainee } from '@training-log/contracts';
import { Controller, Get } from '@nestjs/common';
import { TraineeService } from './trainee.service';

@Controller('trainees')
export class TraineeController {
	constructor(private traineeService: TraineeService) {}

	@Get()
	getData(): Promise<Trainee[]> {
		return this.traineeService.getData();
	}
}
