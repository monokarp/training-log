import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExerciseType } from '@training-log/contracts';
import { filter, map, Observable, startWith } from 'rxjs';
import { isNonEmptyString } from '../../../shared/core/type-guards/is-string';

@Component({
	selector: 'portal-exercise-select',
	templateUrl: './exercise-select.component.html',
	styleUrls: ['./exercise-select.component.scss'],
})
export class ExerciseSelectComponent implements OnInit {
	@Input() public data: ExerciseType[] = [];

	public control: FormControl;

	public filteredData$: Observable<ExerciseType[]>;

	public selectedId$: Observable<string>;

	private readonly exerciseNames: Set<string> = new Set();

	constructor() {
		this.control = new FormControl('', [Validators.required, (c: FormControl) => this.validateExerciseName(c)]);

		const matches = (str: string, value: string) => str.toLowerCase().includes(value.toLowerCase());

		this.filteredData$ = this.control.valueChanges.pipe(
			startWith(''),
			map(value => this.data.filter(one => matches(one.name, value) || matches(one.id, value))),
		);

		this.selectedId$ = this.control.valueChanges.pipe(
			map((name: string) => this.idByName(name)),
			filter(isNonEmptyString),
		);
	}

	public ngOnInit(): void {
		for (const one of this.data) {
			this.exerciseNames.add(one.name);
		}
	}

	public selected(): { id: string; name: string } {
		return this.control.valid
			? {
					id: this.idByName(this.control.value),
					name: this.control.value,
			  }
			: {
					id: '',
					name: '',
			  };
	}

	public select(value: string): void {
		this.control.setValue(value);
	}

	public reset(): void {
		this.control.setValue('');
		this.control.markAsUntouched();
	}

	public markAsTouched() {
		this.control.markAsTouched();
	}

	private idByName(name: string) {
		return this.data.find(one => one.name === name)?.id ?? '';
	}

	private validateExerciseName(c: FormControl) {
		return this.exerciseNames.has(c.value) ? null : { validateExerciseName: { valid: false } };
	}
}
