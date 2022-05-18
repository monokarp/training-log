import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { PreferencesModule } from '../src/app/preferences/preferences.module';
import { resetDatabase } from './scripts';

describe(PreferencesModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [PreferencesModule],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	afterAll(async () => {
		await resetDatabase();
		await app.close();
	});

	test('get preferences', async () => {
		getPreferences(app, 'mnk', {
			localeCode: 'en-US',
			unit: 'kg',
		});
	});

	test('update preferences', async () => {
		const result = await app.inject({
			method: 'PUT',
			url: '/preferences',
			payload: {
				userId: 'mnk',
				localeCode: 'ru-RU',
				unit: 'lbs',
			},
		});

		expect(result.statusCode).toEqual(200);

		getPreferences(app, 'mnk', {
			localeCode: 'ru-RU',
			unit: 'lbs',
		});
	});
});

async function getPreferences(app: NestFastifyApplication, userId: string, expected: unknown) {
	const result = await app.inject({
		method: 'GET',
		url: `/preferences/${userId}`,
	});

	expect(result.statusCode).toEqual(200);
	expect(JSON.parse(result.payload)).toEqual(expected);
}
