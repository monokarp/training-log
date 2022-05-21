import { Injectable } from '@angular/core';
import { ManagementRight, User, UserManagementRights } from '@training-log/contracts';
import { HttpService } from '../core/http.service';

export const DefaultMgmtRights: UserManagementRights = {
	coaches: [],
	trainees: [],
};

@Injectable()
export class ManagementRights {
	constructor(private httpService: HttpService) {}

	public async for(userId: string): Promise<UserManagementRights> {
		try {
			const result = await this.httpService.get<UserManagementRights>(`/api/management-rights/${userId}`);

			return result;
		} catch (err) {
			return DefaultMgmtRights;
		}
	}

	public async add(ownerId: string, targetId: string): Promise<User | null> {
		try {
			const user = await this.httpService.post<ManagementRight, User>(`/api/management-rights/add`, {
				ownerId,
				targetId,
			});

			return user;
		} catch (err) {
			return null;
		}
	}

	public async revoke(ownerId: string, targetId: string): Promise<boolean> {
		try {
			await this.httpService.post(`/api/management-rights/revoke`, { ownerId, targetId });

			return true;
		} catch (err) {
			return false;
		}
	}
}
