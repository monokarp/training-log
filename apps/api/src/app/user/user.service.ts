import { Injectable } from '@nestjs/common';
import { LocaleCode, User, UserFullData } from '@training-log/contracts';
import { PreferencesRepository } from '../preferences/preferences.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository, private preferences: PreferencesRepository) { }

	public async registerUser(data: User & { password: string }): Promise<void> {
		await this.userRepository.create(data);

		await this.preferences.createFor(data.id, { unit: 'kg', localeCode: LocaleCode.Default })
	}

	public async fullData(id: string): Promise<UserFullData | null> {
		return this.userRepository.fullData(id);
	}
}
