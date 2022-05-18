import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { ExerciseType } from '@training-log/contracts';
import { ExerciseModule } from '../src/app/exercise/exercise.module';
import { resetDatabase } from './scripts';

describe(ExerciseModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ExerciseModule],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	afterAll(async () => {
		await resetDatabase();
		await app.close();
	});

	test('get all user exercise types', async () => {
		await getAllExercises(app, 'mnk', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
		]);
	});

	test('get all including personal bests', async () => {
		const result = await app.inject({
			method: 'GET',
			url: '/exercises/withpb/mnk',
		});

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.payload)).toEqual([
			{ id: 'bench', name: 'Bench Press', personalBestFrom: '2022-01-01T00:00:00.000Z', personalBest: 145 },
			{ id: 'deadlift', name: 'Deadlift', personalBestFrom: '2022-01-01T00:00:00.000Z', personalBest: 230 },
			{ id: 'squat', name: 'Squat', personalBestFrom: '2022-01-01T00:00:00.000Z', personalBest: 210 },
		]);
	});

	test('create new exercise type type', async () => {
		const result = await app.inject({
			method: 'PUT',
			url: '/exercises/create',
			payload: {
				userId: 'mnk',
				localeCode: 'en-US',
				id: 'squat_p',
				name: 'Paused Squat',
			},
		});

		expect(result.statusCode).toEqual(201);

		await getAllExercises(app, 'mnk', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
			{ id: 'squat_p', name: 'Paused Squat' },
		]);
	});

	test('delete unreferenced exercise type', async () => {
		const result = await app.inject({
			method: 'DELETE',
			url: '/exercises',
			payload: { userId: 'mnk', id: 'squat_p' },
		});

		expect(result.statusCode).toEqual(200);

		await getAllExercises(app, 'mnk', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
		]);
	});

	test('delete referenced exercise', async () => {
		const result = await app.inject({
			method: 'DELETE',
			url: '/exercises',
			payload: { userId: 'mnk', id: 'squat' },
		});

		expect(result.statusCode).toEqual(409);
		expect(JSON.parse(result.payload).message).toEqual('This exercise is referred to by 3 existing work items');
	});
});

async function getAllExercises(app: NestFastifyApplication, userId: string, expected: ExerciseType[]) {
	const result = await app.inject({
		method: 'GET',
		url: `/exercises/all/${userId}`,
	});

	expect(result.statusCode).toEqual(200);
	expect(JSON.parse(result.payload)).toEqual(expected);
}
