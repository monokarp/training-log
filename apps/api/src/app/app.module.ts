import { Module } from '@nestjs/common';
import { TraineeModule } from './trainee/trainee.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
	imports: [TraineeModule, WorkoutModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
