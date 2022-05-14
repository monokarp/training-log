import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PreferencesUpdateData, UserPreferences } from '@training-log/contracts';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
	constructor(private preferencesService: PreferencesService) {}

	@Get()
	public preferencesFor(@Param('userId') userId: string): Promise<UserPreferences> {
		return this.preferencesService.for(userId);
	}

	@Put()
	public async updatePreferencesFor(@Body() body: { data: PreferencesUpdateData }): Promise<void> {
		return this.preferencesService.updateOne(body.data);
	}
}
