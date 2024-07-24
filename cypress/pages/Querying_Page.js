
class Querying_Page {
    // is displayed
    static is_querying_title_displayed(){
        cy.get('.home-list').find('li:nth-child(1)').find('a').should('be.visible')
    }

    static click_querying_title(){
        cy.get('.home-list').find('li:nth-child(1)').find('a').click()
    }
}