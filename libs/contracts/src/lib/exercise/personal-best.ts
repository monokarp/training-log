export interface PersonalBestData {
	weight: number;
	starting: Date;
	exerciseId: string;
}

export interface PersonalBest extends PersonalBestData {
	id: number;
}
