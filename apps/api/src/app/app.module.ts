import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise/exercise.module';
import { TraineeModule } from './trainee/trainee.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
	imports: [TraineeModule, WorkoutModule, ExerciseModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
