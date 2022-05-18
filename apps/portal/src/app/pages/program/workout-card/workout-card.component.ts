import { Component, Input } from '@angular/core';
import { Set } from '@training-log/contracts';
import { SessionStore } from '../../login/session.store';
import { TrainingSession } from '../viewmodel/types';

@Component({
	selector: 'portal-workout-card',
	templateUrl: './workout-card.component.html',
	styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent {
	@Input() session: TrainingSession | undefined;

	constructor(private sessionStore: SessionStore) {}

	public format(one: Set) {
		return `${one.sets} x ${one.reps} @ ${one.weight}${
			this.sessionStore.currentlyManagedUser$.getValue()?.unit ?? ''
		}`;
	}

	public format1RM(one: Set): string {
		return one.personalBest ? ` ${Math.floor((one.weight / one.personalBest) * 100)}%` : '';
	}
}
