describe('React demo', () => {
	it('Renders the heading', () => {
		cy.visit('http://localhost:8085/');
		cy.contains('React is configured correctly');
	});
});
