import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormContainerComponent } from './data-form-container.component';

describe('TlFormContainerComponent', () => {
	let component: TlFormContainerComponent;
	let fixture: ComponentFixture<TlFormContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormContainerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
