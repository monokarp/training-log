import { Injectable } from '@nestjs/common';
import { User, UserWithPreferences } from '@training-log/contracts';
import { UserPreferencesRepository } from './user-preferences.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository, private userPreferencesRepository: UserPreferencesRepository) {}

	public one(id: string): Promise<User | null> {
		return this.userRepository.one(id);
	}

	public async withPreferences(id: string): Promise<UserWithPreferences | null> {
		const [user, pref] = await Promise.all([this.userRepository.one(id), this.userPreferencesRepository.one(id)]);

		if (!user || !pref) {
			return null;
		}

		return { ...user, ...pref };
	}
}
