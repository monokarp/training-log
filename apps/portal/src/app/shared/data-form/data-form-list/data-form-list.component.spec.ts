import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormListComponent } from './data-form-list.component';

describe('DataFormListComponent', () => {
	let component: DataFormListComponent;
	let fixture: ComponentFixture<DataFormListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
