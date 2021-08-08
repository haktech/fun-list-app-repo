import {APP_URL} from '../test-utils'
describe('Cypress', () => {
    it('opens the app', () => {
        cy.visit(APP_URL)
        // check app header 
        cy.get('.logo').should('contain', 'Fun list app')

        cy.get('.movieTitle').should('contain', 'Movie List')
        // check list of movies are loaded 
        cy.get('[data-value="Hero"] > .movieListImgContainer').should('contain', 'Hero')
        cy.get('[data-value="Abdo"] > .movieListImgContainer').should('contain', 'Abdo')
    })
})
