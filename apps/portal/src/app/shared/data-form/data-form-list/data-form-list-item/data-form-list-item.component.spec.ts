import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormListItemComponent } from './data-form-list-item.component';

describe('DataFormListItemComponent', () => {
	let component: DataFormListItemComponent;
	let fixture: ComponentFixture<DataFormListItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormListItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
