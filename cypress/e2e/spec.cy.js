describe('App landing page', () => {
  beforeEach(() => {
    // any needed actions
  })

  it('shows the landing page', () => {
    cy.visit('/');
    cy.findByText(/internal services portal/i).should('be.visible');
  });

  it('user can log in', function () {
    const username = 'mylawacad+A@gmail.com'
    const password = '123-Test'
  
    cy.visit('/');

    cy.findByText('Login').click();

    cy.url().should('include', '/sign-in')

    cy.get('input[name=email]').type(username)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.findByRole('heading', {  name: /there is nothing to show on this dashboard yet/i}).should('be.visible');
  })
});