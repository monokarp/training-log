import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';

export function resetDatabase() {
	return new Promise((res, rej) => {
		const ls = exec('npx prisma db seed', function (error, stdout) {
			if (error) {
				rej(error);
			}

			res(stdout);
		});

		ls.on('exit', function (code) {
			res(code);
		});
	});
}

export async function clearTables(clientInstance: PrismaClient) {
	await clientInstance.workItem.deleteMany();
	await clientInstance.workout.deleteMany();
	await clientInstance.personalBest.deleteMany();
	await clientInstance.translation.deleteMany();
	await clientInstance.exerciseType.deleteMany();
	await clientInstance.userPreferences.deleteMany();
	await clientInstance.user.deleteMany();
	await clientInstance.locale.deleteMany();
}
