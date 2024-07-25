const environment = Cypress.env(`environment`);
const domain = Cypress.env().test.baseUrl;

describe('Actions Tests', () => {
    let user;
    beforeEach(function () {
        cy.fixture('userDatas/' + environment).then((user_data) => {
            user = user_data;
            cy.clearLocalStorage()
            cy.visit(domain)
            const title = user.general.title;
            cy.is_website_load_successfully(domain, title);
            // Add this step to navigate to the "Actions" page
            cy.get('.home-list').find('li:nth-child(4)').find('a').contains('Window').click()

        })
    })

    // To get the global window object, use the cy.window() command.
    it('Test traversal cy.window() command', () => {
        cy.window().should('have.property', 'top')
    })

    // To get the document object, use the cy.document() command.
    it('Test traversal cy.document() command', () => {
        cy.document().should('have.property','charset').and('eq','UTF-8')
    })

     // To get the title, use the cy.title() command.
     it('Test traversal cy.title() command', () => {
        cy.title().should('include','Kitchen')
    })
})