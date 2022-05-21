import { User } from './user';

export interface ManagementRight {
	ownerId: string;
	targetId: string;
}

export interface UserManagementRights {
	coaches: User[];
	trainees: User[];
}
