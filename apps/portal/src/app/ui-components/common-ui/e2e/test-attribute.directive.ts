import { Directive, ElementRef, Input, isDevMode } from '@angular/core';
import { TestAttributes } from '@training-log/shared';

@Directive({
	selector: '[e2e]',
})
export class TestAttributeDirective {
	constructor(private element: ElementRef) {}

	@Input('e2e') public set testAttribute(value: TestAttributes) {
		if (isDevMode()) {
			(this.element.nativeElement as Element).setAttribute('data-test', value);
		}
	}
}
