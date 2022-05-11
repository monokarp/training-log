import { Module } from '@nestjs/common';
import { AuthModule } from './auithentication/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { PersonalBestModule } from './personal-best/personal-best.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
	imports: [AuthModule, WorkoutModule, ExerciseModule, PersonalBestModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
