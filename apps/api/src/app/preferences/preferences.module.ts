import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PreferencesController } from './preferences.controller';
import { PreferencesRepository } from './preferences.repository';
import { PreferencesService } from './preferences.service';

@Module({
	imports: [SharedModule],
	controllers: [PreferencesController],
	providers: [PreferencesService, PreferencesRepository],
})
export class PreferencesModule {}
