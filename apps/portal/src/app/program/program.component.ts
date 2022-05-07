import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Set } from '@training-log/contracts';
import { filter, map } from 'rxjs/operators';
import { isNonEmptyString } from '../shared/type-guards/is-string';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';

@Component({
	selector: 'portal-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent implements OnDestroy {
	private storeUpdates = this.route.url
		.pipe(
			map(([firstSegment]) => firstSegment?.path),
			filter(isNonEmptyString),
		)
		.subscribe(username => this.programService.load(username));

	constructor(
		private route: ActivatedRoute,
		public programService: ProgramService,
		public programStore: ProgramStore,
	) {}

	// TODO persist tab selection state in store?

	public ngOnDestroy(): void {
		this.storeUpdates.unsubscribe();
	}

	public openCreateSessionModal() {
		this.programService.createNewSession();
	}

	public format(one: Set) {
		// TODO Workset as icon
		return `${one.multiple}x${one.reps}@${one.weight}${one.unit}${this.format1RM(one)}${one.isWorkSet ? ' W' : ''}`;
	}

	private format1RM(one: Set): string {
		return one.oneRepMax ? ` ${Math.floor((one.weight / one.oneRepMax) * 100)}%` : '';
	}
}
