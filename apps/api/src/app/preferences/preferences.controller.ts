import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserPreferences } from '@training-log/contracts';
import { UpdatePreferencesDTO } from './dto/update-preferences';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
	constructor(private preferencesService: PreferencesService) {}

	@Get(':userId')
	public preferencesFor(@Param('userId') userId: string): Promise<UserPreferences> {
		return this.preferencesService.for(userId);
	}

	@Put()
	public async updatePreferencesFor(@Body() body: UpdatePreferencesDTO): Promise<void> {
		return this.preferencesService.updateOne(body);
	}
}
