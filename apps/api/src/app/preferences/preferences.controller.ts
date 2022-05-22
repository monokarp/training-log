import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserPreferences } from '@training-log/contracts';
import { CoachOnly } from '../auth/guards/coach-only';
import { UpdatePreferencesDTO } from './dto/update-preferences';
import { PreferencesService } from './preferences.service';

@Controller(':userId/preferences')
export class PreferencesController {
	constructor(private preferencesService: PreferencesService) {}

	@Get()
	public preferencesFor(@Param('userId') userId: string): Promise<UserPreferences> {
		return this.preferencesService.for(userId);
	}

	@Put()
	@UseGuards(CoachOnly)
	public async updatePreferencesFor(
		@Param('userId') userId: string,
		@Body() body: UpdatePreferencesDTO,
	): Promise<void> {
		return this.preferencesService.updateOne({ userId, ...body });
	}
}
