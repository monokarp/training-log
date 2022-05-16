import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteExerciseData, ExerciseType, ExerciseWithPB, NewExerciseData } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class Exercises {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string): Promise<ExerciseType[]> {
		try {
			const result = await this.httpService.get(`/api/exercises/all/${userId}`);

			return (result as ExerciseType[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async includingPersonalBestFor(userId: string): Promise<ExerciseWithPB[]> {
		try {
			const result = await this.httpService.get(`/api/exercises/withpb/${userId}`);

			return (result as ExerciseWithPB[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async create(data: NewExerciseData): Promise<string | null> {
		try {
			const result = await this.httpService.put<{ id: string }, NewExerciseData>(`/api/exercises/create`, data);

			return (result.id as string) ?? null;
		} catch (err) {
			return null;
		}
	}

	public async delete(data: DeleteExerciseData): Promise<string | null> {
		try {
			await this.httpService.delete(`/api/exercises`, data);

			return null;
		} catch (err: unknown) {
			return (err as HttpErrorResponse).error.message;
		}
	}
}
