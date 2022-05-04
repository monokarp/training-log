import { Injectable } from '@nestjs/common';
import { Trainee } from '@training-log/contracts';
import { TraineeRepository } from './trainee.repository';

@Injectable()
export class TraineeService {
	constructor(private traineeRepository: TraineeRepository) {}

	public getData(): Promise<Trainee[]> {
		return this.traineeRepository.many();
	}
}
