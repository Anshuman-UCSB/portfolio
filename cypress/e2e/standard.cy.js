describe('template spec', () => {
  // Beforeall it should go to localhost:5173
  before(() => {
    cy.visit('localhost:5173/')
  })

  it('Has the right title' , () => {
    // Check that the url title is "Anshuman Dash"
    cy.title().should('eq', 'Anshuman Dash')
  })
})