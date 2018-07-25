describe('Vue.js demo', () => {
	it('Renders the heading', () => {
		cy.visit('http://localhost:8086/');
		cy.contains('Welcome to Your Vue.js App');
	});
});
