import { Injectable } from '@angular/core';
import { WithUser, Workout } from '@training-log/contracts';
import { NewWorkout } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class Workouts {
	constructor(private httpService: HttpService) {}

	public async one(id: number, userId: string): Promise<Workout | null> {
		try {
			const result = await this.httpService.get<Workout>(`/api/${userId}/workouts/${id}`);

			return { ...result, date: new Date(result.date) } ?? null;
		} catch (err) {
			return null;
		}
	}

	public async for(userId: string): Promise<Workout[]> {
		try {
			const result = await this.httpService.get<Workout[]>(`/api/${userId}/workouts`);

			return result ? result.map(one => ({ ...one, date: new Date(one.date) })) : [];
		} catch (err) {
			return [];
		}
	}

	public async create(data: WithUser<NewWorkout>): Promise<number | null> {
		const { userId, ...payload } = data;

		try {
			const result = await this.httpService.post(`/api/${userId}/workouts`, payload);

			return (result as { id: number })?.id ?? null;
		} catch (err) {
			return null;
		}
	}
}
