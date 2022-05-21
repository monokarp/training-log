import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@training-log/contracts';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TlNotification } from '../../../ui-components/tl-form/tl-notification';
import { TraineesService } from './trainees.service';
import { TraineesStore } from './trainees.store';

type DisplayMode = 'Coaches' | 'Trainees';

@Component({
	selector: 'portal-trainees',
	templateUrl: './trainees.component.html',
	styleUrls: ['./trainees.component.scss'],
})
export class TraineesComponent implements OnInit {
	public userId = new FormControl('', [Validators.required]);

	public readonly displayModes: DisplayMode[] = ['Coaches', 'Trainees'];

	public mode = new BehaviorSubject<DisplayMode>('Trainees');

	public listData$: Observable<User[]> = combineLatest([this.mode, this.store.currentUserRights$]).pipe(
		map(([mode, mgmtRights]) => {
			switch (mode) {
				case 'Coaches':
					return mgmtRights.coaches;
				case 'Trainees':
				default:
					return mgmtRights.trainees;
			}
		}),
	);

	constructor(private service: TraineesService, public store: TraineesStore, private notification: TlNotification) {}

	ngOnInit(): void {
		this.service.loadStore();
	}

	public select(one: User) {
		this.userId.setValue(one.id);
	}

	public async add() {
		if (this.userId.invalid) {
			return;
		}

		// TODO do not reset value if update failed?
		await this.service.addCoach(this.userId.value);

		this.resetInput();
	}

	public async revoke() {
		if (this.userId.invalid) {
			return;
		}

		switch (this.mode.getValue()) {
			case 'Coaches':
				await this.service.revokeCoach(this.userId.value);
				break;
			case 'Trainees':
			default:
				await this.service.revokeTrainee(this.userId.value);
		}

		this.resetInput();
	}

	public onModeSelect(data: { value: DisplayMode }) {
		this.mode.next(data.value);
	}

	private resetInput() {
		this.userId.setValue('');
		this.userId.markAsUntouched();
	}
}
