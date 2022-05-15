import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Set } from '@training-log/contracts';
import { SessionStore } from '../login/session.store';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';

@Component({
	selector: 'portal-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent implements OnInit {
	constructor(
		public programService: ProgramService,
		public programStore: ProgramStore,
		private sessionStore: SessionStore,
	) {}

	ngOnInit(): void {
		this.programService.load();
	}

	public openCreateSessionModal() {
		this.programService.createNewSession();
	}

	public format(one: Set) {
		// TODO Workset as icon
		return `${one.sets}x${one.reps}@${one.weight}${
			this.sessionStore.activeUser$.getValue()?.unit ?? ''
		}${this.format1RM(one)}`;
	}

	private format1RM(one: Set): string {
		return one.personalBest ? ` ${Math.floor((one.weight / one.personalBest) * 100)}%` : '';
	}
}
