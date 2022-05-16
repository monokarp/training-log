import { Set } from '@training-log/contracts';

export interface TrainingYear {
	year: number;
	weeks: TrainingWeek[];
}

export interface TrainingWeek {
	week: number;
	sessions: TrainingSession[];
}

export interface TrainingSession {
	date: string;
	comment?: string;
	exercises: TrainingExercise[];
}

export interface TrainingExercise {
	name: string;
	sets: Set[];
}

export interface NewWorkout {
	date: Date;
	exercises: NewExercise[];
}

export interface NewExercise {
	exercise: string;
	code: string;
	program: string;
}
