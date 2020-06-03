describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with sign in screen', () => {
    cy.visit ('/');
    cy.contains('Sign in with Google');
  });

  it('open home with Work2Gather link', () => {
    cy.visit ('/');
    cy.contains('Work2Gather').click();
    cy.contains('Add a new goal');
  });

  it('opens form to add new goal', () => {
    cy.visit ('/');
    cy.contains('Welcome,');
    cy.contains('Add a new goal');
    cy.contains('Add a new goal').click();
    //cy.contains("Create a new goal")
  });
});