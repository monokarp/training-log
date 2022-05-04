import { Injectable } from '@angular/core';
import { Trainee } from '@training-log/contracts';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Injectable()
export class Trainees {
	constructor(private httpService: HttpService) {}

	public async all(): Promise<Trainee[]> {
		try {
			const result = await firstValueFrom(this.httpService.get('/api/trainees/'));

			return (result as Trainee[]) ?? [];
		} catch (err) {
			return [];
		}
	}
}
