import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormActionComponent } from './data-form-action.component';

describe('DataFormActionComponent', () => {
	let component: DataFormActionComponent;
	let fixture: ComponentFixture<DataFormActionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormActionComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
