import { UserPreferences } from './preferences';

export interface User {
	id: string;
	name: string;
}

export interface UserWithPreferences extends User, UserPreferences {}

export interface UserFullData extends UserWithPreferences {
	password: string;
	trainees: UserWithPreferences[];
}

export interface UserAuthResult {
	user: UserWithPreferences;
	trainees: UserWithPreferences[];
	token: string;
}
