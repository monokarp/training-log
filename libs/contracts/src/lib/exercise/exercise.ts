export interface ExerciseType {
	id: string;
	name: string;
}

export interface ExerciseWithPB extends ExerciseType {
	personalBest: number | null;
	personalBestFrom: Date | null;
}

export interface NewExercise {
	localeCode: string;
	id: string;
	name: string;
}

export interface DeleteExercise {
	id: string;
}
