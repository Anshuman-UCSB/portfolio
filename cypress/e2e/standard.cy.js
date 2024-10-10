describe('template spec', () => {
  // Beforeall it should go to localhost:5173
  beforeEach(() => {
    cy.visit('localhost:5173/')
  })

  it('Has the right title' , () => {
    // Check that the url title is "Anshuman Dash"
    cy.title().should('eq', 'Anshuman Dash')
  })

  it('Has selectable headers', ()=>{
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.font-bold').should('have.text', 'Anshuman Dash');
    cy.get('.px-6 > .text-darkbrown').should('have.text', 'ABOUT');
    cy.get('.px-6 > .text-darkbrown').should('have.class', 'text-4xl');
    cy.get('.px-6 > .text-darkbrown').should('have.class', 'text-darkbrown');
    cy.get('.px-6 > :nth-child(2)').should('have.text', 'PROJECTS');
    cy.get('.px-6 > :nth-child(3)').should('have.text', 'CONTACT');
    cy.get('.px-6 > :nth-child(2)').should('have.class', 'text-faded');
    cy.get('.px-6 > :nth-child(3)').should('have.class', 'text-faded');
    cy.get('.px-6 > :nth-child(3)').click();
    cy.get('.px-6 > .text-darkbrown').should('have.class', 'text-darkbrown');
    cy.get('.px-6 > :nth-child(1)').should('have.class', 'text-faded');
    /* ==== End Cypress Studio ==== */
  })
})