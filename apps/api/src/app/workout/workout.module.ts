import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';

@Module({
	imports: [SharedModule],
	controllers: [WorkoutController],
	providers: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
