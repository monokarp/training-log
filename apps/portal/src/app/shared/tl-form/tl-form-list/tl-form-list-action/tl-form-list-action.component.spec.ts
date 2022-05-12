import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormListActionComponent } from './data-form-list-action.component';

describe('TlFormListActionComponent', () => {
	let component: TlFormListActionComponent;
	let fixture: ComponentFixture<TlFormListActionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormListActionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormListActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
