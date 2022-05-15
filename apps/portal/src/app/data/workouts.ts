import { Injectable } from '@angular/core';
import { Workout } from '@training-log/contracts';
import { CreateWorkoutData } from '@training-log/contracts';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Workouts {
	constructor(private httpService: HttpService) {}

	public async one(id: number): Promise<Workout | null> {
		try {
			const result = await this.httpService.get<Workout>(`/api/workouts/one/${id}`);

			return { ...result, date: new Date(result.date) } ?? null;
		} catch (err) {
			return null;
		}
	}

	public async for(traineeUsername: string): Promise<Workout[]> {
		try {
			const result = await this.httpService.get<Workout[]>(`/api/workouts/${traineeUsername}`);

			return result ? result.map(one => ({ ...one, date: new Date(one.date) })) : [];
		} catch (err) {
			return [];
		}
	}

	public async create(newWorkoutData: CreateWorkoutData): Promise<number | null> {
		try {
			const result = await this.httpService.post(`/api/workouts`, newWorkoutData);

			return (result as { id: number })?.id ?? null;
		} catch (err) {
			return null;
		}
	}
}
