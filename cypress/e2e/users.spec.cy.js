describe('App users page', () => {
  beforeEach(() => {
    // any needed actions
  })

  it('naviagtes to the users page', () => {
    const username = 'mylawacad+A@gmail.com'
    const password = '123-Test'

    cy.visit('/sign-in')
    cy.findByRole('heading', {  name: /sign in/i}).should('be.visible');

    cy.get('input[name=email]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.visit('/users')

    // ensure each test user is present
    cy.findByText(/mylawacad\+a@gmail\.com/i).should('be.visible');
    cy.findByText(/mylawacad\+b@gmail\.com/i).should('be.visible');
    cy.findByText(/mylawacad\+c@gmail\.com/i).should('be.visible');
  });

});