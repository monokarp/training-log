import { Injectable } from '@angular/core';
import { Exercise } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Exercises {
	constructor(private httpService: HttpService) {}

	public async for(traineeUsername: string): Promise<Exercise[]> {
		try {
			const result = await firstValueFrom(this.httpService.get(`/api/exercises/${traineeUsername}`));

			return (result as Exercise[]) ?? [];
		} catch (err) {
			return [];
		}
	}
}
