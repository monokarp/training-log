import { Module } from '@nestjs/common';
import { AuthModule } from './auithentication/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
	imports: [AuthModule, WorkoutModule, ExerciseModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
