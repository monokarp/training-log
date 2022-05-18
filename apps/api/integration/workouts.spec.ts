import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { WorkoutModule } from '../src/app/workout/workout.module';
import { resetDatabase } from './scripts';

describe(WorkoutModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [WorkoutModule],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	afterAll(async () => {
		await resetDatabase();
		await app.close();
	});

	test('get user workouts', async () => {
		await getAllWorkouts(app, 'trainee', [
			{
				date: '2022-01-01T00:00:00.000Z',
				comment: 'This is the initially seeded workout',
				sets: [
					{ exerciseName: 'Squat', order: 0, sets: 1, reps: 5, weight: 70, comment: null, personalBest: 210 },
					{
						exerciseName: 'Squat',
						order: 1,
						sets: 1,
						reps: 5,
						weight: 120,
						comment: null,
						personalBest: 210,
					},
					{
						exerciseName: 'Squat',
						order: 2,
						sets: 3,
						reps: 5,
						weight: 170,
						comment: 'Missed last rep',
						personalBest: 210,
					},
					{
						exerciseName: 'Deadlift',
						order: 3,
						sets: 1,
						reps: 5,
						weight: 70,
						comment: null,
						personalBest: 230,
					},
					{
						exerciseName: 'Deadlift',
						order: 4,
						sets: 1,
						reps: 5,
						weight: 120,
						comment: null,
						personalBest: 230,
					},
					{
						exerciseName: 'Deadlift',
						order: 5,
						sets: 1,
						reps: 5,
						weight: 170,
						comment: null,
						personalBest: 230,
					},
					{
						exerciseName: 'Deadlift',
						order: 6,
						sets: 1,
						reps: 5,
						weight: 200,
						comment: 'Felt easy',
						personalBest: 230,
					},
					{
						exerciseName: 'Bench Press',
						order: 7,
						sets: 1,
						reps: 3,
						weight: 70,
						comment: null,
						personalBest: 145,
					},
					{
						exerciseName: 'Bench Press',
						order: 8,
						sets: 5,
						reps: 3,
						weight: 110,
						comment: null,
						personalBest: 145,
					},
				],
			},
		]);
	});

	test('create new workout', async () => {
		const result = await app.inject({
			method: 'POST',
			url: '/workouts',
			payload: {
				userId: 'trainee',
				date: new Date('2022-02-02T00:00:00.000Z'),
				comment: 'test workout',
				sets: [
					{ exerciseId: 'squat', order: 0, sets: 5, reps: 5, weight: 160, comment: 'LIGHT WEIGHT BABY' },
					{ exerciseId: 'deadlift', order: 1, sets: 1, reps: 10, weight: 200 },
				],
			},
		});

		expect(result.statusCode).toEqual(201);
		expect(JSON.parse(result.payload)).toEqual({ id: expect.any(Number) });

		const newWorkout = await app.inject({
			method: 'GET',
			url: `/workouts/one/${JSON.parse(result.payload).id}`,
		});

		expect(newWorkout.statusCode).toEqual(200);
		expect(JSON.parse(newWorkout.payload)).toEqual({
			date: '2022-02-02T00:00:00.000Z',
			comment: 'test workout',
			sets: [
				{
					exerciseName: 'Squat',
					order: 0,
					sets: 5,
					reps: 5,
					weight: 160,
					comment: 'LIGHT WEIGHT BABY',
					personalBest: 210,
				},
				{
					exerciseName: 'Deadlift',
					order: 1,
					sets: 1,
					reps: 10,
					weight: 200,
					comment: null,
					personalBest: 230,
				},
			],
		});

		const allWorkouts = await app.inject({
			method: 'GET',
			url: '/workouts/trainee',
		});

		expect(allWorkouts.statusCode).toEqual(200);
		expect(JSON.parse(allWorkouts.payload)).toHaveLength(2);
	});
});

async function getAllWorkouts(app: NestFastifyApplication, userId: string, expected: unknown[]) {
	const result = await app.inject({
		method: 'GET',
		url: `/workouts/${userId}`,
	});

	expect(result.statusCode).toEqual(200);
	expect(JSON.parse(result.payload)).toEqual(expected);
}
