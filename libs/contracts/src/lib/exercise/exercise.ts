export interface ExerciseType {
	id: string;
	name: string;
}

export interface ExerciseWithPB extends ExerciseType {
	personalBest: number | null;
	personalBestFrom: Date | null;
}

export interface NewExercise {
	userId: string;
	localeCode: string;
	id: string;
	name: string;
}

export interface DeleteExercise {
	userId: string;
	id: string;
}
