import { ExerciseType, PersonalBest, WorkItem, Workout } from '@prisma/client';

export type FullWorkout = Workout & {
	WorkItem: FullWorkItem[];
};

export type FullWorkItem = WorkItem & {
	ExerciseType: ExerciseType & {
		PersonalBest: PersonalBest[];
	};
};
