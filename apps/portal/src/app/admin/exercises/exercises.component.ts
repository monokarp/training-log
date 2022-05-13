import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExerciseType } from '@training-log/contracts';
import { ExerciseService } from './exercise.service';
import { ExercisesStore } from './exercise.store';

@Component({
	selector: 'portal-exercises',
	templateUrl: './exercises.component.html',
	styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
	public exercisesId = new FormControl('', [
		Validators.required,
		Validators.pattern(/^[a-zA-Z_]+$/),
		(c: FormControl) => (this.service.valudateNew(c.value) ? null : { unique: { valid: false } }),
	]);

	public exercisesName = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]);

	constructor(public store: ExercisesStore, private service: ExerciseService) {}

	public ngOnInit(): void {
		this.service.loadStore();
	}

	public async submit() {
		if (this.exercisesId.valid && this.exercisesName.valid) {
			await this.service.createNew(this.exercisesId.value, this.exercisesName.value);
			this.clearInputs();
		}
	}

	public delete(id: string) {
		this.service.delete(id);
	}

	public trackExerciseType(idx: number, exercise: ExerciseType) {
		return exercise.id;
	}

	public clearInputs() {
		this.exercisesId.setValue('');
		this.exercisesId.markAsUntouched();

		this.exercisesName.setValue('');
		this.exercisesName.markAsUntouched();
	}
}
