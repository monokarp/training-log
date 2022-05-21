import { WeightUnit } from '../i18n';

export interface User {
	id: string;
	name: string;
}

export interface UserPreferences {
	unit: WeightUnit;
	localeCode: string;
}

export interface UserWithPreferences extends User, UserPreferences {}

export interface UserFullData extends UserWithPreferences {
	password: string;
	trainees: UserWithPreferences[];
}

export interface PreferencesUpdateData extends UserPreferences {
	userId: string;
}

export interface UserAuthResult {
	user: UserWithPreferences;
	trainees: UserWithPreferences[];
	token: string;
}

export interface ManagementRight {
	ownerId: string;
	targetId: string;
}

export interface UserManagementRights {
	coaches: User[];
	trainees: User[];
}
