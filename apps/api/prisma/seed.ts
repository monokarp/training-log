import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
	[1, 'squat', 'Squat', 'Присед', 215],
	[2, 'dl', 'Deadlift', 'Тяга', 240],
	[3, 'bench', 'Bench press', 'Жим лежа', 150],
	[4, 'bench_with_band', 'Resistance band bench press', 'Жим лежа с резиной', 140],
	[5, 'press', 'Standing press', 'Жим стоя', 75],
	[6, 'good_morning', 'Good mornings', 'Наклоны', 100],
];

async function main() {
	const trainee = await prisma.trainee.create({ data: { name: 'Олег', username: 'mnk' } });

	await prisma.locale.createMany({
		data: [{ code: 'en-US' }, { code: 'ru-RU' }],
	});

	await seedExercisesFor(trainee.id);

	const workout = await prisma.workout.create({
		data: {
			traineeId: trainee.id,
			date: new Date().toISOString(),
		},
	});

	await prisma.set.createMany({
		data: [
			{
				workoutId: workout.id,
				exerciseId: 1,
				order: 0,
				reps: 5,
				weight: 70,
			},
			{
				workoutId: workout.id,
				exerciseId: 1,
				order: 1,
				reps: 5,
				weight: 120,
			},
			{
				workoutId: workout.id,
				exerciseId: 1,
				order: 2,
				multiple: 3,
				reps: 5,
				weight: 170,
				isWorkSet: true,
			},
			{
				workoutId: workout.id,
				exerciseId: 3,
				order: 0,
				reps: 5,
				weight: 70,
			},
			{
				workoutId: workout.id,
				exerciseId: 3,
				order: 1,
				multiple: 4,
				reps: 4,
				weight: 120,
				isWorkSet: true,
			},
			{
				workoutId: workout.id,
				exerciseId: 3,
				order: 0,
				reps: 8,
				weight: 60,
			},
			{
				workoutId: workout.id,
				exerciseId: 3,
				order: 1,
				multiple: 3,
				reps: 8,
				weight: 90,
				isWorkSet: true,
			},
		],
	});
}

async function seedExercisesFor(traineeId: number) {
	for (const [id, code, nameEN, nameRU, oneRepMax] of exercises) {
		const exercise = await prisma.exercise.create({
			data: {
				id: id as number,
				nameCode: code as string,
			},
		});

		await prisma.translation.createMany({
			data: [
				{
					localeCode: 'en-US',
					code: code as string,
					value: nameEN as string,
				},
				{
					localeCode: 'ru-RU',
					code: code as string,
					value: nameRU as string,
				},
			],
		});

		await prisma.oneRepMax.create({
			data: {
				traineeId,
				exerciseId: exercise.id,
				value: oneRepMax as number,
				starting: new Date(),
			},
		});
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
