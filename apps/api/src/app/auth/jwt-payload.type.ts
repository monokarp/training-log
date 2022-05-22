export interface JwtPayload {
	sub: string;
	traineeIds: string[];
}

export interface JwtUser {
	userId: string;
	traineeIds: string[];
}
