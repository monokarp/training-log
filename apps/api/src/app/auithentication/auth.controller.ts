import { Body, Controller, Post } from '@nestjs/common';
import { UserWithPreferences } from '@training-log/contracts';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private userService: UserService) {}

	@Post()
	public authenticate(@Body() body: { data: { id: string } }): Promise<UserWithPreferences | null> {
		return this.userService.withPreferences(body.data.id);
	}
}
