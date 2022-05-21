import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ManagementRightsController } from './management-rights.controller';
import { ManagementRightsRepository } from './management-rights.repository';
import { ManagementRightsService } from './management-rights.service';

@Module({
	imports: [SharedModule, UserModule],
	controllers: [ManagementRightsController],
	providers: [ManagementRightsService, ManagementRightsRepository],
})
export class ManagementRightsModule {}
