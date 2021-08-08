import { APP_URL } from "../test-utils";

// app should be able to switch between the two side menu views
describe('Side Menu', () => {
    it('should be able to switch between the two side menu views', () => {
        cy.visit(APP_URL);
        cy.get('[href="/actors"] > .sidebarListItem').click();
        // expect element to be visible 
        cy.get('[data-value="1"]').should('be.visible');
        cy.get('[href="/movies"] > .sidebarListItem').click();
        // expect page header to be visible
        cy.get('.movieTitle').should('be.visible');

    })

})