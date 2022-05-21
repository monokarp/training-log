import { Injectable } from '@nestjs/common';
import { ManagementRight, User, UserManagementRights } from '@training-log/contracts';
import { isNotNull } from '@training-log/shared';
import { UserRepository } from '../user/user.repository';
import { ManagementRightsRepository } from './management-rights.repository';

@Injectable()
export class ManagementRightsService {
	constructor(
		private managementRightsRepository: ManagementRightsRepository,
		private userRepository: UserRepository,
	) {}

	public async all(id: string): Promise<UserManagementRights> {
		const all = await this.managementRightsRepository.managementRights(id);

		const unique = <T>(arr: T[]) => Array.from(new Set(arr));

		const coachIds = unique(all.filter(one => one.targetId === id).map(one => one.ownerId));
		const traineeIds = unique(all.filter(one => one.ownerId === id).map(one => one.targetId));

		const users = await this.userRepository.many(unique([...coachIds, ...traineeIds]));

		return {
			coaches: coachIds.map(id => users.find(user => user.id === id)).filter(isNotNull),
			trainees: traineeIds.map(id => users.find(user => user.id === id)).filter(isNotNull),
		};
	}

	public async add(one: ManagementRight): Promise<User | null> {
		try {
			await this.managementRightsRepository.add(one);

			const user = await this.userRepository.one(one.ownerId);

			return user;
		} catch (err) {
			return null;
		}
	}

	public async revoke(one: ManagementRight): Promise<void> {
		return this.managementRightsRepository.revoke(one);
	}
}
