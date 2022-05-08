export interface Workout {
	date: Date;
	comment: string | null;
	sets: Set[];
}

export interface Set {
	exerciseName: string;
	order: number;
	sets: number;
	reps: number;
	weight: number;
	comment: string | null;
}

export interface CreateWorkoutData {
	userId: string;
	date: Date;
	comment?: string;
	sets: CreateSetData[];
}

export interface CreateSetData {
	exerciseId: string;
	order: number;
	sets: number;
	reps: number;
	weight: number;
	comment?: string;
}
