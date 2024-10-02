import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciseWithPB } from '@training-log/contracts';
import { ExerciseSelectComponent } from '../../../ui-components/common-ui/exercise-select/exercise-select.component';
import { TlNotification } from '../../../ui-components/tl-form/tl-notification';
import { NewExerciseModel } from '../viewmodel/types';

const DateFormat = 'DD-MM-YYYY';

@Component({
	selector: 'portal-create-session',
	templateUrl: './create-session.component.html',
	styleUrls: ['./create-session.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
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
	public exericses: NewExerciseModel[] = [];
	public dateFormat = DateFormat;

	@ViewChild(ExerciseSelectComponent) exercise!: ExerciseSelectComponent;

	public date = new FormControl('', [Validators.required]);
	public program = new FormControl('', [
		Validators.required,
		Validators.pattern(/^(?:[0-9]+x[0-9]+@[0-9]+(?:\r\n|\r|\n)?)+$/),
	]);

	constructor(
		private dialogRef: MatDialogRef<CreateSessionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ExerciseWithPB[],
		private notification: TlNotification,
	) {}

	public submit(): void {
		if (!this.date.valid) {
			return this.date.markAsTouched();
		}

		if (this.exericses.length) {
			this.dialogRef.close({
				date: this.date.value,
				exercises: this.exericses,
			});
		} else {
			this.notification.warn("Can't submit an empty session");
		}
	}

	public cancel() {
		this.dialogRef.close();
	}

	public addExercise() {
		const { id, name } = this.exercise.selected();

		if (id && this.program.valid) {
			this.exericses.push({
				exercise: name,
				code: id,
				program: this.program.value!,
			});
			this.clearCurrentExercise();
		} else {
			this.exercise.markAsTouched();
			this.program.markAsTouched();
		}
	}

	public removeExercise(index: number) {
		this.exericses.splice(index, 1);
	}

	public clearCurrentExercise() {
		this.exercise.reset();

		this.program.setValue('');
		this.program.markAsUntouched();
	}

	public copyToCurrent(one: { exercise: string; program: string }) {
		this.exercise.select(one.exercise);
		this.program.setValue(one.program);
	}
}
