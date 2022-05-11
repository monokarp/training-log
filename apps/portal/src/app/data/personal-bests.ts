import { Injectable } from '@angular/core';
import { PersonalBest } from '@training-log/contracts';
import { HttpService } from '../shared/http.service';

@Injectable()
export class PersonalBests {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string, exerciseId: string): Promise<PersonalBest[]> {
		try {
			const result = await this.httpService.get(`/api/personal-best/${userId}/${exerciseId}`);

			return (result as PersonalBest[]) ?? [];
		} catch (err) {
			return [];
		}
	}
}
