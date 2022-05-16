import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormListComponent } from './tl-form-list.component';

describe('TlFormListComponent', () => {
	let component: TlFormListComponent;
	let fixture: ComponentFixture<TlFormListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
