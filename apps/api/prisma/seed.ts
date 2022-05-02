import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const trainee = await prisma.trainee.create({ data: { name: 'Олег' } });

	await prisma.locale.createMany({
		data: [{ code: 'en-US' }, { code: 'ru-RU' }],
	});

	await seedExercisesFor(trainee.id);
}

async function seedExercisesFor(traineeId: number) {
	const exercises = [
		['squat', 'Squat', 'Присед', 215],
		['dl', 'Deadlift', 'Тяга', 240],
		['bench', 'Bench press', 'Жим лежа', 150],
		['bench_with_band', 'Resistance band bench press', 'Жим лежа с резиной', 140],
		['press', 'Standing press', 'Жим стоя', 75],
		['good_morning', 'Good mornings', 'Наклоны', 100],
	];

	for (const [code, nameEN, nameRU, oneRepMax] of exercises) {
		const exercise = await prisma.exercise.create({
			data: {
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
