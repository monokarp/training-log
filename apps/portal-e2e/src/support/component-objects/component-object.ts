import { TestAttributes } from '@training-log/shared';

export class ComponentObject {
	constructor(private containerAttr: TestAttributes) {}

	public get itself() {
		return cy.getByTestAttr(this.containerAttr);
	}
}
