describe('The welcome page', () => {
  it('successfully loads welcome page', () => {
    cy.visit('/');

    // todo: should show title properly
    cy.get('.MuiTypography-root.MuiTypography-h3').should(($d) => {
      expect($d).to.contain('Welcome to Online Registration');
      //expect($d).to.be('Welcome to Online Registration');
    });

    cy.get('button').click();
  });

  it('should go to personal detials page after next button is clicked', () => {
    // todo: locate title, back button and next button

    cy.get('button')
      .first()
      .should(($d) => {
        expect($d).to.contain('Back');
      });

    // todoL locate input filed
    // todo: should show title properly
    // todo: next button should show error
    // todo: auto fill first name and last name
  });
});
