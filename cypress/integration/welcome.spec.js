describe('The welcome page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('button').click();
  });
});
