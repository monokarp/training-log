import { Injectable } from '@nestjs/common';
import { User, UserWithPreferences } from '@training-log/contracts';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public one(id: string): Promise<User | null> {
		return this.userRepository.one(id);
	}

	public async withPreferences(id: string): Promise<{ user: UserWithPreferences; pw: string } | null> {
		return this.userRepository.withPreferences(id);
	}
}
