import { Workout } from '@training-log/contracts';

export interface TrainingYear {
	year: number;
	weeks: TrainingWeek[];
}

export interface TrainingWeek {
	week: number;
	sessions: Workout[];
}
