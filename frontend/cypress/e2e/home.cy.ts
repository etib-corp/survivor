describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/')
    })
    it('has a Profiles button', () => {
      cy.visit('/')
      cy.get('a[href="/Profiles"]').should('have.text', 'Profiles')
    })
  })
