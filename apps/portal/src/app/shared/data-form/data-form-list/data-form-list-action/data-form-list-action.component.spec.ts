import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormListActionComponent } from './data-form-list-action.component';

describe('DataFormListActionComponent', () => {
	let component: DataFormListActionComponent;
	let fixture: ComponentFixture<DataFormListActionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormListActionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormListActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
