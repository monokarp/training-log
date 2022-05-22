import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtUser } from '../jwt-payload.type';

@Injectable()
export class CoachOnly implements CanActivate {
	public canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		const { userId } = request.params;

		// eslint-disable-next-line no-prototype-builtins
		if (!request.params.hasOwnProperty('userId')) {
			throw new BadRequestException('Requires authentication and a "userId" param');
		}

		const user = request.user as JwtUser;

		console.log('jwt user', user);
		console.log('params', request.params);

		const isHimself = userId === user?.userId;
		const isCoach = user?.traineeIds?.includes(userId);

		console.log('isHimself', isHimself);
		console.log('isCoach', isCoach);

		if (!isHimself && !isCoach) {
			throw new UnauthorizedException(`Requires coaching rights over ${userId}`);
		}

		return true;
	}
}
