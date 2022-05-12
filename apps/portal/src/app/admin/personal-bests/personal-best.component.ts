import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PersonalBest } from '@training-log/contracts';
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
	public date = new FormControl('', [Validators.required]);
	public weight = new FormControl('', [Validators.required]);

	constructor(
		public exerciseStore: ExercisesStore,
		public personalBestStore: PersonalBestStore,
		private exerciseService: ExerciseService,
		private personalBestService: PersonalBestService,
	) {}

	ngOnInit(): void {
		this.exerciseService.loadStore();
		this.personalBestService.loadStore();
	}

	public addPersonalBest() {
		return null;
	}

	public delete(pb: PersonalBest) {
		return null;
	}
}
