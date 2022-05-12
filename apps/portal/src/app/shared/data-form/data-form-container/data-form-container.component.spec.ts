import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormContainerComponent } from './data-form-container.component';

describe('DataFormContainerComponent', () => {
	let component: DataFormContainerComponent;
	let fixture: ComponentFixture<DataFormContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DataFormContainerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DataFormContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
