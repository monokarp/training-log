import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { CoachOnly } from '../src/app/auth/guards/coach-only';
import { PersonalBestModule } from '../src/app/personal-best/personal-best.module';
import { resetDatabase } from './scripts';

describe(PersonalBestModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [PersonalBestModule],
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

	test('get personal bests for a user', async () => {
		const result = await app.inject({
			method: 'GET',
			url: 'trainee/personal-best',
		});

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.payload)).toEqual([
			{
				exerciseId: 'squat',
				id: expect.any(Number),
				starting: '2022-01-01T00:00:00.000Z',
				weight: 210,
			},
			{
				exerciseId: 'bench',
				id: expect.any(Number),
				starting: '2022-01-01T00:00:00.000Z',
				weight: 145,
			},
			{
				exerciseId: 'deadlift',
				id: expect.any(Number),
				weight: 230,
				starting: '2022-01-01T00:00:00.000Z',
			},
		]);
	});
});
