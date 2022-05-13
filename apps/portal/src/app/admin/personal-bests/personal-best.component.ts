import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PersonalBest } from '@training-log/contracts';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseService } from '../exercises/exercise.service';
import { ExercisesStore } from '../exercises/exercise.store';
import { PersonalBestService } from './personal-best.service';
import { PersonalBestStore } from './personal-best.store';

@Component({
	selector: 'portal-personal-bests',
	templateUrl: './personal-best.component.html',
	styleUrls: ['./personal-best.component.scss'],
})
export class PersonalBestComponent implements OnInit {
	public date = new FormControl({ value: '', disabled: true }, [Validators.required]);
	public weight = new FormControl('', [Validators.required]);
	public exercise = new FormControl('', [Validators.required]);

	public personalBests$ = combineLatest([this.personalBestStore.personalBests$, this.exercise.valueChanges]).pipe(
		map(([all, selectedId]) => (selectedId ? all.filter(one => one.exerciseId === selectedId) : all)),
	);

	constructor(
		public exerciseStore: ExercisesStore,
		private personalBestStore: PersonalBestStore,
		private exerciseService: ExerciseService,
		private personalBestService: PersonalBestService,
	) {}

	ngOnInit(): void {
		this.exerciseService.loadStore();
		this.personalBestService.loadStore();
	}

	public async addPersonalBest() {
		if ([this.date, this.weight, this.exercise].some(one => one.invalid)) {
			return;
		}

		await this.personalBestService.create({
			exerciseId: this.exercise.value,
			weight: this.weight.value,
			starting: this.date.value,
		});

		this.clearInputs();
	}

	public delete(pb: PersonalBest) {
		this.personalBestService.delete(pb.id);
	}

	public clearInputs() {
		[this.date, this.weight, this.exercise].forEach(one => {
			one.setValue('');
			one.markAsUntouched();
		});
	}
}
