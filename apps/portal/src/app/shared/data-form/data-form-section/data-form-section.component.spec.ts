import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormSectionComponent } from './data-form-section.component';

describe('DataFormSectionComponent', () => {
	let component: DataFormSectionComponent;
	let fixture: ComponentFixture<DataFormSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormSectionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
