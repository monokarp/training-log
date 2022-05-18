import { PrismaClient } from '@prisma/client';
import { env } from 'process';
import { clearTables } from '../integration/scripts';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	await clearTables(prisma);

	await prisma.locale.createMany({
		data: [{ code: 'en-US' }, { code: 'ru-RU' }],
	});

	const user = await prisma.user.create({
		data: {
			name: 'Олег',
			id: 'mnk',
			password: await bcrypt.hash('mnk', Number(env.SALT_ROUNDS)),
			UserPreferences: {
				create: { unit: 'kg', localeCode: 'en-US' },
			},
			Translation: {
				createMany: {
					data: [
						{ localeCode: 'en-US', code: 'squat', value: 'Squat' },
						{ localeCode: 'en-US', code: 'bench', value: 'Bench Press' },
						{ localeCode: 'en-US', code: 'deadlift', value: 'Deadlift' },
					],
				},
			},
			ExerciseType: {
				createMany: {
					data: [
						{ id: 'squat', translationCode: 'squat' },
						{ id: 'bench', translationCode: 'bench' },
						{ id: 'deadlift', translationCode: 'deadlift' },
					],
				},
			},
		},
	});

	await prisma.personalBest.createMany({
		data: [
			{ userId: user.id, exerciseId: 'squat', starting: '2022-01-01T00:00:00.000Z', weight: 210 },
			{ userId: user.id, exerciseId: 'bench', starting: '2022-01-01T00:00:00.000Z', weight: 145 },
			{ userId: user.id, exerciseId: 'deadlift', starting: '2022-01-01T00:00:00.000Z', weight: 230 },
		],
	});

	await prisma.workout.create({
		data: {
			userId: user.id,
			date: '2022-01-01T00:00:00.000Z',
			comment: 'This is the initially seeded workout',
			WorkItem: {
				createMany: {
					data: [
						{
							userId: user.id,
							exerciseId: 'squat',
							order: 0,
							sets: 1,
							reps: 5,
							weight: 70,
						},
						{
							userId: user.id,
							exerciseId: 'squat',
							order: 1,
							sets: 1,
							reps: 5,
							weight: 120,
						},
						{
							userId: user.id,
							exerciseId: 'squat',
							order: 2,
							sets: 3,
							reps: 5,
							weight: 170,
							comment: 'Missed last rep',
						},
						{
							userId: user.id,
							exerciseId: 'deadlift',
							order: 3,
							sets: 1,
							reps: 5,
							weight: 70,
						},
						{
							userId: user.id,
							exerciseId: 'deadlift',
							order: 4,
							sets: 1,
							reps: 5,
							weight: 120,
						},
						{
							userId: user.id,
							exerciseId: 'deadlift',
							order: 5,
							sets: 1,
							reps: 5,
							weight: 170,
						},
						{
							userId: user.id,
							exerciseId: 'deadlift',
							order: 6,
							sets: 1,
							reps: 5,
							weight: 200,
							comment: 'Felt easy',
						},
						{
							userId: user.id,
							exerciseId: 'bench',
							order: 7,
							sets: 1,
							reps: 3,
							weight: 70,
						},
						{
							userId: user.id,
							exerciseId: 'bench',
							order: 8,
							sets: 5,
							reps: 3,
							weight: 110,
						},
					],
				},
			},
		},
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
