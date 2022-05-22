import { Injectable } from '@nestjs/common';
import { UserPreferences, WithUser } from '@training-log/contracts';
import { PreferencesRepository } from './preferences.repository';

@Injectable()
export class PreferencesService {
	constructor(private preferencesRepository: PreferencesRepository) {}

	public async for(userId: string): Promise<UserPreferences> {
		return this.preferencesRepository.for(userId);
	}

	public async updateOne(data: WithUser<UserPreferences>): Promise<void> {
		return this.preferencesRepository.updateOne(data);
	}
}
