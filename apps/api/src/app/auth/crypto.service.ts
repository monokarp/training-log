import { Injectable } from '@nestjs/common';
import { env } from 'process';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
	private readonly saltRounds = env.SALT_ROUNDS;

	public async hash(value: string): Promise<string> {
		return bcrypt.hash(value, Number(this.saltRounds));
	}

	public async compare(value: string, hash: string): Promise<boolean> {
		return bcrypt.compare(value, hash);
	}
}
