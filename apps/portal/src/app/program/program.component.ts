import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProgramService } from './program.service';
import { ProgramStore } from './program.store';

@Component({
	selector: 'portal-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramComponent implements OnInit {
	constructor(public programService: ProgramService, public programStore: ProgramStore) {}

	ngOnInit(): void {
		this.programService.load();
	}

	public openCreateSessionModal() {
		this.programService.createNewSession();
	}
}
