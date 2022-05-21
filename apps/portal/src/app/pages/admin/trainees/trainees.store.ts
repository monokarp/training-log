import { Injectable } from '@angular/core';
import { UserManagementRights } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';
import { DefaultMgmtRights } from '../../../shared/data/management-rights';

@Injectable()
export class TraineesStore {
	public readonly currentUserRights$ = new BehaviorSubject<UserManagementRights>(DefaultMgmtRights);
}
