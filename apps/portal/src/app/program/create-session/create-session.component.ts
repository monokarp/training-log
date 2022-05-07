import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

const DateFormat = 'DD-MM-YYYY';

@Component({
	selector: 'portal-create-session',
	templateUrl: './create-session.component.html',
	styleUrls: ['./create-session.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
		{
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: 'LL',
				},
				display: {
					dateInput: DateFormat,
					monthYearLabel: 'YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'YYYY',
				},
			},
		},
	],
})
export class CreateSessionComponent {
	public exericses: { exercise: string; program: string }[] = [];
	public dateFormat = DateFormat;

	public exercise = '';
	public program = '';

	constructor(private dialogRef: MatDialogRef<CreateSessionComponent>) {}

	public submit(): void {
		this.dialogRef.close({});
	}

	public cancel() {
		this.dialogRef.close();
	}

	public addExercise() {
		if (this.exercise && this.program) {
			this.exericses.push({ exercise: this.exercise, program: this.program });
			this.clearCurrentExercise();
		}
	}

	public removeExercise(index: number) {
		this.exericses.splice(index, 1);
	}

	public clearCurrentExercise() {
		this.exercise = '';
		this.program = '';
	}

	public copyToCurrent(one: { exercise: string; program: string }) {
		this.exercise = one.exercise;
		this.program = one.program;
	}
}
