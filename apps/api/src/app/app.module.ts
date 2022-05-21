import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { I18nModule } from './i18n/i18n.module';
import { ManagementRightsModule } from './management-rights/management-rights.module';
import { PersonalBestModule } from './personal-best/personal-best.module';
import { PreferencesModule } from './preferences/preferences.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
	imports: [
		AuthModule,
		WorkoutModule,
		ExerciseModule,
		PersonalBestModule,
		I18nModule,
		PreferencesModule,
		ManagementRightsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
