export interface Trainee {
	name: string;
	username: string;
}

export interface Workout {
	date: string;
	comment?: string;
	sets: Set[];
}

export interface Exercise {
	code: string;
	name: string;
	oneRepMax?: OneRM;
}

export interface OneRM {
	value: number;
	unit: WeightUnit;
	starting: string;
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

export interface CreateWorkoutData {
	date: string;
	traineeUsername: string;
	sets: CreateSetData[];
}

export interface CreateSetData {
	name: string;
	order: number;
	multiple: number;
	weight: number;
	reps: number;
}
