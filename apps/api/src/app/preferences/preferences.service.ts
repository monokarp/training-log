import { Injectable } from '@nestjs/common';
import { PreferencesUpdateData, UserPreferences } from '@training-log/contracts';
import { PreferencesRepository } from './preferences.repository';

@Injectable()
export class PreferencesService {
	constructor(private preferencesRepository: PreferencesRepository) {}

	public async for(userId: string): Promise<UserPreferences> {
		return this.preferencesRepository.for(userId);
	}

	public async updateOne(data: PreferencesUpdateData): Promise<void> {
		return this.preferencesRepository.updateOne(data);
	}
}
