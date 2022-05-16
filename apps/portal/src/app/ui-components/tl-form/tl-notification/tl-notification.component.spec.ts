import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlNotificationComponent } from './tl-notification.component';

describe('TlNotificationComponent', () => {
	let component: TlNotificationComponent;
	let fixture: ComponentFixture<TlNotificationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TlNotificationComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TlNotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
