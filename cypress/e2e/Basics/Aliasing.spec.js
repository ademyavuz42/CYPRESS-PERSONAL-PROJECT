// Examples of Aliasing commands

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

            cy.get('.home-list').find('li').find('a').contains('Aliasing').scrollIntoView().click()
        })
    })

    // To alias a route or DOM element for use later, use the .as() command.
    it('Test connectors .as() command', () => {
        cy.get('.as-table').find('tbody tr').first()
        .find('td').first()
        .find('button').as('firstButton')
        cy.get('@firstButton').click()
        cy.get('@firstButton').should('have.class','btn-success').and('contain','Changed')
        cy.intercept('GET','**/comments/*').as('getComment')
        cy.get('.network-btn').click()
        cy.wait('@getComment').its('response.statusCode').should('eq',200)
    })
})