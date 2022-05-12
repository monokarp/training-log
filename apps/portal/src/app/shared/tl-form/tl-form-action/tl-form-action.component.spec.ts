import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormActionComponent } from './data-form-action.component';

describe('TlFormActionComponent', () => {
	let component: TlFormActionComponent;
	let fixture: ComponentFixture<TlFormActionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormActionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
