import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSelectComponent } from './exercise-select.component';

describe('ExerciseSelectComponent', () => {
	let component: ExerciseSelectComponent;
	let fixture: ComponentFixture<ExerciseSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ExerciseSelectComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ExerciseSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
