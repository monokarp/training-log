import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormListActionsComponent } from './data-form-list-actions.component';

describe('DataFormListActionsComponent', () => {
	let component: DataFormListActionsComponent;
	let fixture: ComponentFixture<DataFormListActionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormListActionsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormListActionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
