import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ProgramComponent {
	// private storeUpdates = this.route.url
	// 	.pipe(
	// 		map(([firstSegment]) => firstSegment?.path),
	// 		filter(isNonEmptyString),
	// 	)
	// 	.subscribe(username => this.programService.load(username));

	constructor(
		private route: ActivatedRoute,
		public programService: ProgramService,
		public programStore: ProgramStore,
		private sessionStore: SessionStore,
	) {}

	// TODO persist tab selection state in store?

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
