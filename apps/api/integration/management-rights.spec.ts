import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { UserManagementRights } from '@training-log/contracts';
import { CoachOnly } from '../src/app/auth/guards/coach-only';
import { ManagementRightsModule } from '../src/app/management-rights/management-rights.module';
import { resetDatabase } from './scripts';

describe(ManagementRightsModule.name, () => {
	let app: NestFastifyApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [ManagementRightsModule],
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

	test('coach management rights', async () => {
		await getMgmtRights('coach', {
			coaches: [],
			trainees: [{ id: 'trainee', name: 'Trainee User' }],
		});
	});

	test('trainee management rights', async () => {
		await getMgmtRights('trainee', {
			coaches: [{ id: 'coach', name: 'Coach User' }],
			trainees: [],
		});
	});

	test('revoke', async () => {
		const result = await app.inject({
			method: 'POST',
			url: 'management-rights/revoke',
			payload: { ownerId: 'coach', targetId: 'trainee' },
		});

		expect(result.statusCode).toEqual(200);

		await getMgmtRights('coach', {
			coaches: [],
			trainees: [],
		});
	});

	test('add', async () => {
		const r1 = await app.inject({
			method: 'POST',
			url: 'management-rights/add',
			payload: { ownerId: 'trainee', targetId: 'coach' },
		});

		expect(r1.statusCode).toEqual(201);
		expect(JSON.parse(r1.payload)).toEqual({ id: 'trainee', name: 'Trainee User' });

		const r2 = await app.inject({
			method: 'POST',
			url: 'management-rights/add',
			payload: { ownerId: 'coach', targetId: 'trainee' },
		});

		expect(r2.statusCode).toEqual(201);
		expect(JSON.parse(r2.payload)).toEqual({ id: 'coach', name: 'Coach User' });

		await getMgmtRights('coach', {
			coaches: [{ id: 'trainee', name: 'Trainee User' }],
			trainees: [{ id: 'trainee', name: 'Trainee User' }],
		});
	});

	async function getMgmtRights(userId: string, expected: UserManagementRights) {
		const result = await app.inject({
			method: 'GET',
			url: `management-rights/${userId}`,
		});

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.payload)).toEqual(expected);
	}
});
