describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with sign in screen', () => {
    cy.visit ('/');
    cy.contains('Sign in with Google');
  });
});