import { PrismaClient } from '@prisma/client';
import { exercises, workouts } from './seed-data';

const prisma = new PrismaClient();

async function main() {
	const trainee = await prisma.trainee.create({ data: { name: 'Олег', username: 'mnk' } });

	await prisma.locale.createMany({
		data: [{ code: 'en-US' }, { code: 'ru-RU' }],
	});

	await seedExercisesFor(trainee.id);

	// await seedWorkoutsFor(trainee.id);
}

async function seedExercisesFor(traineeId: number) {
	for (const [id, code, nameEN, nameRU, oneRepMax] of exercises) {
		const exercise = await prisma.exercise.create({
			data: {
				id: id as number,
				nameCode: code as string,
			},
		});

		await prisma.oneRepMax.create({
			data: {
				id: id as number,
				traineeId,
				exerciseId: exercise.id,
				value: oneRepMax as number,
				starting: new Date(),
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
	}
}

async function seedWorkoutsFor(traineeId: number) {
	for (const { id, date, sets } of workouts) {
		await prisma.workout.create({
			data: {
				id: id,
				traineeId,
				date: date,
			},
		});

		await prisma.set.createMany({
			data: sets,
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
