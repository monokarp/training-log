import { Injectable } from '@angular/core';
import { ExerciseType, ExerciseWithPB } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Exercises {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string): Promise<ExerciseType[]> {
		try {
			const result = await firstValueFrom(this.httpService.get(`/api/exercises/all/${userId}`));

			return (result as ExerciseType[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async includingPersonalBestFor(userId: string): Promise<ExerciseWithPB[]> {
		try {
			const result = await firstValueFrom(this.httpService.get(`/api/exercises/withpb/${userId}`));

			return (result as ExerciseWithPB[]) ?? [];
		} catch (err) {
			return [];
		}
	}
}
