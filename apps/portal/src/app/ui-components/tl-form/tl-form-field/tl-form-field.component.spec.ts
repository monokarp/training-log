import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormFieldComponent } from './tl-form-field.component';

describe('TlFormFieldComponent', () => {
	let component: TlFormFieldComponent;
	let fixture: ComponentFixture<TlFormFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormFieldComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
