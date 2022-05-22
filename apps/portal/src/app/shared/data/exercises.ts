import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteExercise, ExerciseType, ExerciseWithPB, NewExercise, WithUser } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class Exercises {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string): Promise<ExerciseType[]> {
		try {
			const result = await this.httpService.get(`/api/${userId}/exercises`);

			return (result as ExerciseType[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async includingPersonalBestFor(userId: string): Promise<ExerciseWithPB[]> {
		try {
			const result = await this.httpService.get(`/api/${userId}/exercises/withpb`);

			return (result as ExerciseWithPB[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async create(data: WithUser<NewExercise>): Promise<string | null> {
		const { userId, ...payload } = data;

		try {
			const result = await this.httpService.put<{ id: string }, NewExercise>(`/api/${userId}/exercises`, payload);

			return (result.id as string) ?? null;
		} catch (err) {
			return null;
		}
	}

	public async delete(id: string, userId: string): Promise<string | null> {
		try {
			await this.httpService.delete(`/api/${userId}/exercises`, { id });

			return null;
		} catch (err: unknown) {
			return (err as HttpErrorResponse).error.message;
		}
	}
}
