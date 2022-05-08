export interface ExerciseType {
	id: string;
	userId: string;
	name: string;
}

export interface ExerciseWithPB extends ExerciseType {
	personalBest: number | null;
	personalBestFrom: Date | null;
}
