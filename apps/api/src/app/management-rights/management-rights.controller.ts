import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserManagementRights, ManagementRight, User } from '@training-log/contracts';
import { ManagementRightsService } from './management-rights.service';

@Controller('management-rights')
export class ManagementRightsController {
	constructor(private managementRightsService: ManagementRightsService) {}

	@Get(':userId')
	public managementRightFor(@Param('userId') userId: string): Promise<UserManagementRights> {
		return this.managementRightsService.all(userId);
	}

	@Post('add')
	// TODO secure with management rights permission - add anyone as coach only, revoke any coach or trainee
	public async add(@Body() body: ManagementRight): Promise<User | null> {
		return this.managementRightsService.add(body);
	}

	@Post('revoke')
	@HttpCode(HttpStatus.OK)
	public async revoke(@Body() body: ManagementRight): Promise<void> {
		return this.managementRightsService.revoke(body);
	}
}
