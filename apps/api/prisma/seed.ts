import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({ data: { name: 'Олег', id: 'mnk' } });

	await prisma.locale.createMany({
		data: [{ code: 'en-US' }, { code: 'ru-RU' }],
	});

	await prisma.userPreferences.create({
		data: { userId: user.id, unit: 'kg', localeCode: 'en-US' },
	});

	await prisma.translation.createMany({
		data: [
			{ userId: user.id, localeCode: 'en-US', code: 'squat', value: 'Squat' },
			{ userId: user.id, localeCode: 'en-US', code: 'bench', value: 'Bench Press' },
			{ userId: user.id, localeCode: 'en-US', code: 'deadlift', value: 'Deadlift' },
		],
	});

	await prisma.exerciseType.createMany({
		data: [
			{ userId: user.id, id: 'squat', translationCode: 'squat' },
			{ userId: user.id, id: 'bench', translationCode: 'bench' },
			{ userId: user.id, id: 'deadlift', translationCode: 'deadlift' },
		],
	});

	await prisma.personalBest.createMany({
		data: [
			{ userId: user.id, exerciseId: 'squat', starting: new Date(), weight: 210 },
			{ userId: user.id, exerciseId: 'bench', starting: new Date(), weight: 145 },
			{ userId: user.id, exerciseId: 'deadlift', starting: new Date(), weight: 230 },
		],
	});

	const workout = await prisma.workout.create({
		data: {
			userId: user.id,
			date: new Date(),
			comment: 'This is the initially seeded workout',
		},
	});

	await prisma.workItem.createMany({
		data: [
			{ workoutId: workout.id, userId: user.id, exerciseId: 'squat', order: 0, sets: 1, reps: 5, weight: 70 },
			{ workoutId: workout.id, userId: user.id, exerciseId: 'squat', order: 1, sets: 1, reps: 5, weight: 120 },
			{
				workoutId: workout.id,
				userId: user.id,
				exerciseId: 'squat',
				order: 2,
				sets: 3,
				reps: 5,
				weight: 170,
				comment: 'Missed last rep',
			},
			{ workoutId: workout.id, userId: user.id, exerciseId: 'deadlift', order: 3, sets: 1, reps: 5, weight: 70 },
			{ workoutId: workout.id, userId: user.id, exerciseId: 'deadlift', order: 4, sets: 1, reps: 5, weight: 120 },
			{ workoutId: workout.id, userId: user.id, exerciseId: 'deadlift', order: 5, sets: 1, reps: 5, weight: 170 },
			{
				workoutId: workout.id,
				userId: user.id,
				exerciseId: 'deadlift',
				order: 6,
				sets: 1,
				reps: 5,
				weight: 200,
				comment: 'Felt easy',
			},
			{ workoutId: workout.id, userId: user.id, exerciseId: 'bench', order: 7, sets: 1, reps: 3, weight: 70 },
			{ workoutId: workout.id, userId: user.id, exerciseId: 'bench', order: 8, sets: 5, reps: 3, weight: 110 },
		],
	});
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
