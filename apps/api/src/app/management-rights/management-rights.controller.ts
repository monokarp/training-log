import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { User, UserManagementRights } from '@training-log/contracts';
import { ManagementRightDTO } from './dto/management-right';
import { ManagementRightsService } from './management-rights.service';

@Controller('management-rights')
export class ManagementRightsController {
	constructor(private managementRightsService: ManagementRightsService) {}

	@Get(':userId')
	public managementRightFor(@Param('userId') userId: string): Promise<UserManagementRights> {
		return this.managementRightsService.all(userId);
	}

	@Post('add')
	public async add(@Body() body: ManagementRightDTO): Promise<User | null> {
		return this.managementRightsService.add(body);
	}

	@Post('revoke')
	@HttpCode(HttpStatus.OK)
	public async revoke(@Body() body: ManagementRightDTO): Promise<void> {
		return this.managementRightsService.revoke(body);
	}
}
