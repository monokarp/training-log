import { Injectable } from '@angular/core';
import { PersonalBest, PersonalBestData, WithUser } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class PersonalBests {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string): Promise<PersonalBest[]> {
		try {
			const result = await this.httpService.get(`/api/${userId}/personal-best`);

			return (result as PersonalBest[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async create(data: WithUser<PersonalBestData>): Promise<number | null> {
		const { userId, ...payload } = data;

		try {
			const result = await this.httpService.put(`/api/${userId}/personal-best`, payload);

			return (result as number) ?? null;
		} catch (err) {
			return null;
		}
	}

	public async delete(id: number, userId: string): Promise<boolean> {
		try {
			const result = await this.httpService.delete(`/api/${userId}/personal-best`, id);

			return (result as boolean) ?? false;
		} catch (err) {
			return false;
		}
	}
}
