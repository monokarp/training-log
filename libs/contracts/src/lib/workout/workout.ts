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
	personalBest: number | null;
}

export interface NewWorkout {
	date: Date;
	comment?: string;
	sets: NewSet[];
}

export interface NewSet {
	exerciseId: string;
	order: number;
	sets: number;
	reps: number;
	weight: number;
	comment?: string;
}
