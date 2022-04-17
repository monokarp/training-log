import { Injectable } from '@nestjs/common';
import { Database } from './database/database';

@Injectable()
export class AppService {
  constructor(private db: Database) {}
  public get() {
    return this.db.query('SELECT * FROM users ORDER BY id ASC');
  }
}
