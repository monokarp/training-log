import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PersonalBestController } from './personal-best.controller';
import { PersonalBestRepository } from './personal-best.repository';
import { PersonalBestService } from './personal-best.service';

@Module({
	imports: [SharedModule],
	controllers: [PersonalBestController],
	providers: [PersonalBestRepository, PersonalBestService],
})
export class PersonalBestModule {}
