// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		/**
		 * Custom command to select DOM element by 'data-test' attribute, used to mark elements for automated testing
		 * @example cy.getByTestAttr('dashboard-header')
		 */
		getByTestAttr(selector: string): Chainable<Element>;

		/**
		 * Custom command to select DOM element by 'data-test' attribute, used to mark elements for automated testing
		 * @example cy.getByTestAttr('dashboard-header')
		 */
		findByTestAttr(selector: string): Chainable<Element>;
	}
}

Cypress.Commands.add('getByTestAttr', selector => {
	cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add(
	'findByTestAttr',
	{ prevSubject: 'element' },
	($element: JQuery<HTMLElement>, selector: string) => {
		cy.wrap($element).find(`[data-test=${selector}]`);
	},
);

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
