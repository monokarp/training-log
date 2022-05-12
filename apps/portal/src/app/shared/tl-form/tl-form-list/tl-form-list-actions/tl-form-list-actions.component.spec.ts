import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormListActionsComponent } from './data-form-list-actions.component';

describe('TlFormListActionsComponent', () => {
	let component: TlFormListActionsComponent;
	let fixture: ComponentFixture<TlFormListActionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormListActionsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormListActionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
