import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormSectionComponent } from './data-form-section.component';

describe('TlFormSectionComponent', () => {
	let component: TlFormSectionComponent;
	let fixture: ComponentFixture<TlFormSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormSectionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
