import { Set } from '@training-log/contracts';

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
