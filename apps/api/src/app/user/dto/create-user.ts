import { User } from '@training-log/contracts';
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export abstract class CreateUserDTO implements User {
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(20)
	@Matches('[0-9a-z._]+')
	id!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	name!: string;

	@IsString()
	@MinLength(10)
	@MaxLength(30)
	password!: string;
}
