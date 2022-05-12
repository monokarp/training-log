import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlFormListItemComponent } from './data-form-list-item.component';

describe('TlFormListItemComponent', () => {
	let component: TlFormListItemComponent;
	let fixture: ComponentFixture<TlFormListItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlFormListItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlFormListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
