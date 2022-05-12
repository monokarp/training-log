import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormFieldComponent } from './data-form-field.component';

describe('DataFormFieldComponent', () => {
	let component: DataFormFieldComponent;
	let fixture: ComponentFixture<DataFormFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormFieldComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
