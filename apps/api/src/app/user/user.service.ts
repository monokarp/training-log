import { Injectable } from '@nestjs/common';
import { User, UserFullData } from '@training-log/contracts';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public one(id: string): Promise<User | null> {
		return this.userRepository.one(id);
	}

	public async fullData(id: string): Promise<UserFullData | null> {
		return this.userRepository.fullData(id);
	}
}
