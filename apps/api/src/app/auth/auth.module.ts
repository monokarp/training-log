import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';
import { CoachOnly } from './guards/coach-only';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local';
import { JwtStrategy } from './passport-strategies/jwt';
import { LocalStrategy } from './passport-strategies/local';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: env.JWT_SECRET,
			// TODO add refresh tokens
			signOptions: { expiresIn: '1d' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		CryptoService,
		LocalStrategy,
		JwtStrategy,
		LocalAuthGuard,
		CoachOnly,
		JwtAuthGuard,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AuthModule {}
