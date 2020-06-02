describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with sign in screen', () => {
    cy.visit ('/');
    cy.contains('Sign in with Google');
  });


  it('opens form to add new goal', () => {
    cy.visit ('/');
    cy.contains('Sign in with Google').click()
    cy.visit ('/GoalGrid')
    cy.contains('Add a new goal').click();
    cy.contains('Create a new goal');
    cy.contains('Submit');
    cy.contains('Cancel');
  });

  it ('can filter by status', () => {
  	cy.visit('/GoalGrid')
  	cy.contains('Show All').click();
  	cy.visit('/GoalGrid')
  	cy.contains('Show To-Do').click();

  });
});