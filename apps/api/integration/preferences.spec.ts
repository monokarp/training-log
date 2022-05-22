import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { CoachOnly } from '../src/app/auth/guards/coach-only';
import { PreferencesModule } from '../src/app/preferences/preferences.module';
import { resetDatabase } from './scripts';

describe(PreferencesModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [PreferencesModule],
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

	test('get preferences', async () => {
		getPreferences('trainee', {
			localeCode: 'en-US',
			unit: 'kg',
		});
	});

	test('update preferences', async () => {
		const result = await app.inject({
			method: 'PUT',
			url: 'trainee/preferences',
			payload: {
				localeCode: 'ru-RU',
				unit: 'lbs',
			},
		});

		expect(result.statusCode).toEqual(200);

		getPreferences('trainee', {
			localeCode: 'ru-RU',
			unit: 'lbs',
		});
	});

	async function getPreferences(userId: string, expected: unknown) {
		const result = await app.inject({
			method: 'GET',
			url: `${userId}/preferences`,
		});

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.payload)).toEqual(expected);
	}
});
