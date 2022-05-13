import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserPreferencesRepository } from './user-preferences.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
	imports: [SharedModule],
	controllers: [UserController],
	providers: [UserRepository, UserPreferencesRepository, UserService],
	exports: [UserService],
})
export class UserModule {}
