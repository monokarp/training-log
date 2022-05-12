import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/app/auithentication/auth.module';
import { resetDatabase } from './scripts';

describe(AuthModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AuthModule],
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
			payload: { data: { id: 'mnk' } },
		});

		expect(result.statusCode).toEqual(201);
		expect(JSON.parse(result.payload)).toEqual({
			name: 'Олег',
			id: 'mnk',
			localeCode: 'en-US',
			unit: 'kg',
		});
	});
});
