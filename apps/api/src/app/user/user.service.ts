import { Injectable } from '@nestjs/common';
import { PreferencesUpdateData, User, UserPreferences, UserWithPreferences } from '@training-log/contracts';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public one(id: string): Promise<User | null> {
		return this.userRepository.one(id);
	}

	public async withPreferences(id: string): Promise<UserWithPreferences | null> {
		return this.userRepository.withPreferences(id);
	}
}
