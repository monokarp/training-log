import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormListInfoComponent } from './tl-form-list-info.component';

describe('TlFormListInfoComponent', () => {
	let component: TlFormListInfoComponent;
	let fixture: ComponentFixture<TlFormListInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormListInfoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormListInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
