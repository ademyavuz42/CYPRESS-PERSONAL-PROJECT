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
            cy.get('.home-list').find('li:nth-child(7)').find('a').contains('Navigation').click()
        })
    })

    // To go back or forward in the browser's history, use the cy.go() command.
    it('Test navigation cy.go() command', () => {
        cy.location('pathname').should('include','navigation')
        cy.go('back')
        cy.location('pathname').should('not.include','navigation')
        cy.go('forward')
        cy.location('pathname').should('include','navigation')
        cy.go(-1)
        cy.location('pathname').should('not.include','navigation')
        cy.go(1)
        cy.location('pathname').should('include','navigation')
    })

    // To reload the page, use the cy.reload() command.
    it('Test navigation cy.reload() command', () => {
        cy.reload()
        cy.reload(true)
    })

    // To visit a remote page, use the cy.visit() command.
    it.only('Test navigation cy.visit() command', () => {
        cy.visit('https://example.cypress.io/commands/navigation',{
            timeout: 50000,
            onBeforeLoad: function(contentWindow){
            },
            onLoad: function(contentWindow){
            },
        })
    })
})