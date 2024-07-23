class Viewport_Page{
    // is displayed
    static is_viewport_title_displayed(){
        return cy.get('.home-list')
        .find('[href="/commands/viewport"]')
        .parent()
        .contains('Viewport')
        // .should('be.visible')
    }

    // click
    static click_viewport_title(){
        return cy.get('.home-list')
        .find('[href="/commands/viewport"]')
        .parent()
        .contains('Viewport')
        // .click()
    }

    // get
    static get_header_text(){
        return cy.get('h1')
    }
}

export default Viewport_Page;