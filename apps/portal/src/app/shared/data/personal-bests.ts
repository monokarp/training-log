import { Injectable } from '@angular/core';
import { CreatePersonalBestData, PersonalBest } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

@Injectable()
export class PersonalBests {
	constructor(private httpService: HttpService) {}

	public async allFor(userId: string): Promise<PersonalBest[]> {
		try {
			const result = await this.httpService.get(`/api/personal-best/${userId}`);

			return (result as PersonalBest[]) ?? [];
		} catch (err) {
			return [];
		}
	}

	public async create(data: CreatePersonalBestData): Promise<number | null> {
		try {
			const result = await this.httpService.put(`/api/personal-best`, data);

			return (result as number) ?? null;
		} catch (err) {
			return null;
		}
	}

	public async delete(id: number): Promise<boolean> {
		try {
			const result = await this.httpService.delete(`/api/personal-best`, id);

			return (result as boolean) ?? false;
		} catch (err) {
			return false;
		}
	}
}
