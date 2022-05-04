import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

@Module({
	imports: [SharedModule],
	controllers: [WorkoutController],
	providers: [WorkoutService],
})
export class WorkoutModule {}
