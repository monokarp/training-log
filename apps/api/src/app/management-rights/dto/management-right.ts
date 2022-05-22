import { ManagementRight } from '@training-log/contracts';
import { IsNotEmpty } from 'class-validator';

export abstract class ManagementRightDTO implements ManagementRight {
	@IsNotEmpty()
	ownerId!: string;

	@IsNotEmpty()
	targetId!: string;
}
