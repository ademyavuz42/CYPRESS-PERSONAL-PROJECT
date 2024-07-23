class Location_Page{
    // is displayed
    static is_location_title_displayed(){
        cy.get('.home-list')
        .find('[href="/commands/ocation"]')
        .parent()
        .contains('Location').should('be.visible')
    }
    // click
    static click_location_title(){
        cy.get('.home-list')
        .find('[href="/commands/ocation"]')
        .parent()
        .contains('Location').click()
    }
}
export default Location_Page;