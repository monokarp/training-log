import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from '@training-log/contracts';
import { NewExercise } from '../viewmodel/types';

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
	public exericses: NewExercise[] = [];
	public dateFormat = DateFormat;

	public exercise: FormControl;
	public date = new FormControl('', [Validators.required]);
	public program = new FormControl('', [
		Validators.required,
		Validators.pattern(/^(?:[0-9]+x[0-9]+@[0-9]+(?:\r\n|\r|\n)?)+$/),
	]);

	private readonly exerciseNames: Set<string>;

	constructor(
		private dialogRef: MatDialogRef<CreateSessionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Exercise[],
	) {
		this.exerciseNames = new Set(data.map(one => one.name));

		this.exercise = new FormControl('', [Validators.required, (c: FormControl) => this.validateExerciseName(c)]);
	}

	public submit(): void {
		if (!this.date.valid) {
			return this.date.markAsTouched();
		}

		if (this.exericses.length) {
			this.dialogRef.close({
				date: this.date.value,
				exercises: this.exericses,
			});
		}
	}

	public cancel() {
		this.dialogRef.close();
	}

	private validateExerciseName(c: FormControl) {
		return this.exerciseNames.has(c.value) ? null : { validateExerciseName: { valid: false } };
	}

	public addExercise() {
		if (this.exercise.valid && this.program.valid) {
			this.exericses.push({
				exercise: this.exercise.value,
				code: this.data.find(one => one.name === this.exercise.value)?.code ?? '',
				program: this.program.value,
			});
			this.clearCurrentExercise();
		}
	}

	public removeExercise(index: number) {
		this.exericses.splice(index, 1);
	}

	public clearCurrentExercise() {
		this.exercise.setValue('');
		this.exercise.markAsUntouched();

		this.program.setValue('');
		this.program.markAsUntouched();
	}

	public copyToCurrent(one: { exercise: string; program: string }) {
		this.exercise.setValue(one.exercise);
		this.program.setValue(one.program);
	}
}
