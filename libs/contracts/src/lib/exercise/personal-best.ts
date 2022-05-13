export interface PersonalBestData {
	weight: number;
	starting: Date;
	exerciseId: string;
}

export interface PersonalBest extends PersonalBestData {
	id: number;
}

export interface CreatePersonalBestData extends PersonalBestData {
	userId: string;
}
