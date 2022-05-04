export interface Trainee {
	name: string;
	username: string;
}

export interface Workout {
	date: Date;
	comment?: string;
	sets: Set[];
}

export type WeightUnit = 'kg' | 'lbs';

export const enum Locale {
	Default = 'en-US',
	Ru = 'ru-RU',
}

export interface Set {
	exerciseName: string;
	oneRepMax: number;
	order: number;
	multiple: number;
	reps: number;
	weight: number;
	unit: WeightUnit;
	isWorkSet: boolean;
	comment?: string;
}
