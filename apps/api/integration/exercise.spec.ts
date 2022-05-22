import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { ExerciseType } from '@training-log/contracts';
import { CoachOnly } from '../src/app/auth/guards/coach-only';
import { ExerciseModule } from '../src/app/exercise/exercise.module';
import { resetDatabase } from './scripts';

describe(ExerciseModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ExerciseModule],
		})
			.overrideGuard(CoachOnly)
			.useValue({ canActivate: () => true })
			.compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	afterAll(async () => {
		await app.close();
		await resetDatabase();
	});

	test('get all user exercise types', async () => {
		await getAllExercises('trainee', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
		]);
	});

	test('get all including personal bests', async () => {
		const result = await app.inject({
			method: 'GET',
			url: 'trainee/exercises/withpb',
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
			url: 'trainee/exercises',
			payload: {
				localeCode: 'en-US',
				id: 'squat_p',
				name: 'Paused Squat',
			},
		});

		expect(result.statusCode).toEqual(201);

		await getAllExercises('trainee', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
			{ id: 'squat_p', name: 'Paused Squat' },
		]);
	});

	test('delete unreferenced exercise type', async () => {
		const result = await app.inject({
			method: 'DELETE',
			url: 'trainee/exercises',
			payload: { id: 'squat_p' },
		});

		expect(result.statusCode).toEqual(200);

		await getAllExercises('trainee', [
			{ id: 'bench', name: 'Bench Press' },
			{ id: 'deadlift', name: 'Deadlift' },
			{ id: 'squat', name: 'Squat' },
		]);
	});

	test('delete referenced exercise', async () => {
		const result = await app.inject({
			method: 'DELETE',
			url: 'trainee/exercises',
			payload: { id: 'squat' },
		});

		expect(result.statusCode).toEqual(409);
		expect(JSON.parse(result.payload).message).toEqual('This exercise is referred to by 3 existing work items');
	});

	async function getAllExercises(userId: string, expected: ExerciseType[]) {
		const result = await app.inject({
			method: 'GET',
			url: `${userId}/exercises`,
		});

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.payload)).toEqual(expected);
	}
});
