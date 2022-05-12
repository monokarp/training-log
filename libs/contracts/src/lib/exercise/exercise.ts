export interface ExerciseType {
	id: string;
	name: string;
}

export interface ExerciseWithPB extends ExerciseType {
	personalBest: number | null;
	personalBestFrom: Date | null;
}

export interface NewExerciseData {
	userId: string;
	localeCode: string;
	id: string;
	name: string;
}

export interface DeleteExerciseData {
	userId: string;
	id: string;
}
