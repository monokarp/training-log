import { Module } from '@nestjs/common';
import { PreferencesModule } from '../preferences/preferences.module';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
	imports: [SharedModule, PreferencesModule],
	providers: [UserRepository, UserService],
	exports: [UserRepository, UserService],
})
export class UserModule {}
