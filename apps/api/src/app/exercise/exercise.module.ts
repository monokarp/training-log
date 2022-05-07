import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exersice.repostiory';

@Module({
	imports: [SharedModule],
	controllers: [ExerciseController],
	providers: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
