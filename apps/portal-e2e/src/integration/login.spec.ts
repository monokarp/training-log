import { login } from '../support/component-objects/login-page';

describe('Login page', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		login.itself.should('be.visible');
	});
});
