import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PersonalBest } from '@training-log/contracts';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseSelectComponent } from '../../shared/exercise-select/exercise-select.component';
import { ExerciseService } from '../exercises/exercise.service';
import { ExercisesStore } from '../exercises/exercise.store';
import { PersonalBestService } from './personal-best.service';
import { PersonalBestStore } from './personal-best.store';

@Component({
	selector: 'portal-personal-bests',
	templateUrl: './personal-best.component.html',
	styleUrls: ['./personal-best.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalBestComponent implements OnInit, AfterViewInit {
	public date = new FormControl('', [Validators.required]);
	public weight = new FormControl('', [Validators.required]);

	@ViewChild(ExerciseSelectComponent) exercise!: ExerciseSelectComponent;

	public personalBests$: Observable<PersonalBest[]> | undefined;

	constructor(
		public exerciseStore: ExercisesStore,
		private personalBestStore: PersonalBestStore,
		private exerciseService: ExerciseService,
		private personalBestService: PersonalBestService,
	) {}

	public ngOnInit(): void {
		this.exerciseService.loadStore();
		this.personalBestService.loadStore();
	}

	public ngAfterViewInit(): void {
		this.personalBests$ = combineLatest([this.personalBestStore.personalBests$, this.exercise.selectedId$]).pipe(
			map(([all, selectedId]) => (selectedId ? all.filter(one => one.exerciseId === selectedId) : all)),
		);
	}

	public async addPersonalBest() {
		const { id } = this.exercise.selected();

		if ([this.date, this.weight].some(one => one.invalid) || !id) {
			this.date.markAsTouched();
			this.weight.markAsTouched();
			this.exercise.markAsTouched();
			return;
		}

		await this.personalBestService.create({
			exerciseId: id,
			weight: this.weight.value,
			starting: this.date.value,
		});

		this.clearInputs();
	}

	public delete(pb: PersonalBest) {
		this.personalBestService.delete(pb.id);
	}

	public clearInputs() {
		[this.date, this.weight].forEach(one => {
			one.setValue('');
			one.markAsUntouched();
		});

		this.exercise.reset();
	}
}
