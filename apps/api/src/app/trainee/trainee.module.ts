import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
	imports: [SharedModule],
	controllers: [TraineeController],
	providers: [TraineeService],
})
export class TraineeModule {}
