import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/app/auithentication/auth.module';
import { PreferencesModule } from '../src/app/preferences/preferences.module';
import { resetDatabase } from './scripts';

describe(AuthModule.name, () => {
	let app: NestFastifyApplication;

	let token: string;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthModule, PreferencesModule],
		}).compile();

		app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

		await app.init();
		await app.getHttpAdapter().getInstance().ready();
	});

	afterAll(async () => {
		await resetDatabase();
		await app.close();
	});

	test('authenticate', async () => {
		const result = await app.inject({
			method: 'POST',
			url: '/auth',
			payload: { username: 'mnk', password: 'mnk' },
		});

		const responseBody = JSON.parse(result.payload);

		expect(result.statusCode).toEqual(201);
		expect(responseBody).toEqual({
			user: {
				name: 'Олег',
				id: 'mnk',
				localeCode: 'en-US',
				unit: 'kg',
			},
			token: expect.any(String),
		});

		token = responseBody.token;
	});

	test('secured endpoint', async () => {
		const unauthorized = await app.inject({
			method: 'GET',
			url: '/preferences/mnk',
		});

		expect(unauthorized.statusCode).toEqual(401);

		const authorized = await app.inject({
			method: 'GET',
			url: '/preferences/mnk',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		expect(authorized.statusCode).toEqual(200);
		expect(JSON.parse(authorized.payload)).toEqual({
			localeCode: 'en-US',
			unit: 'kg',
		});
	});
});
