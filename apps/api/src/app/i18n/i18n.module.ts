import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { I18nController } from './i18n.controller';
import { I18nRepository } from './i18n.repository';
import { I18nService } from './i18n.service';

@Module({
	imports: [SharedModule],
	controllers: [I18nController],
	providers: [I18nService, I18nRepository],
})
export class I18nModule {}
