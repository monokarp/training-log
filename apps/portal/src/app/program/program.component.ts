import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
		private programService: ProgramService,
		public programStore: ProgramStore,
	) {}

	public ngOnDestroy(): void {
		this.storeUpdates.unsubscribe();
	}
}
