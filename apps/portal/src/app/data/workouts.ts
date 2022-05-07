import { Injectable } from '@angular/core';
import { Workout } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { CreateWorkoutData } from '@training-log/contracts';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Workouts {
	constructor(private httpService: HttpService) {}

	public async for(traineeUsername: string): Promise<Workout[]> {
		try {
			const result = await firstValueFrom(this.httpService.get(`/api/workouts/${traineeUsername}`));

			return (result as Workout[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async create(newWorkoutData: CreateWorkoutData): Promise<boolean> {
		try {
			const result = await firstValueFrom(this.httpService.post(`/api/workouts`, newWorkoutData));

			return (result as boolean) ?? false;
		} catch (err) {
			return false;
		}
	}
}
