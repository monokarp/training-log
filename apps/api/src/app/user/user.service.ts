import { Injectable } from '@nestjs/common';
import { UserFullData } from '@training-log/contracts';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public async fullData(id: string): Promise<UserFullData | null> {
		return this.userRepository.fullData(id);
	}
}
