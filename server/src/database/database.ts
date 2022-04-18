import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { User } from '@contracts/src/user';

import * as config from './connection.json';

const pool = new Pool(config);

@Injectable()
export class Database {
	public async query(queryString: string): Promise<User[]> {
		try {
			const result = await pool.query(queryString);
			return result.rows;
		} catch (error) {
			return [];
		}
	}
}
