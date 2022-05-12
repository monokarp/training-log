import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormListInfoComponent } from './data-form-list-info.component';

describe('DataFormListInfoComponent', () => {
	let component: DataFormListInfoComponent;
	let fixture: ComponentFixture<DataFormListInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormListInfoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormListInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
