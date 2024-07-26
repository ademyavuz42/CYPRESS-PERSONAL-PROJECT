// Examples of Waiting commands

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

            cy.get('.home-list').find('li').find('a').contains('Waiting').scrollIntoView().click()
        })
    })

    // To wait for a specific amount of time or resource to resolve, use the cy.wait() command.
    it('Test connectors cy.wait() command', () => {
       cy.get('.wait-input1').type('Wait 1000s after typing')
       cy.wait(1000)
       cy.get('.wait-input2').type('Wait 1000s after typing')
       cy.wait(1000)
       cy.get('.wait-input3').type('Wait 1000s after typing')
       cy.wait(1000)
       cy.intercept('GET', '**/comments/*').as('getComment')
       cy.get('.network-btn').click()
       cy.wait('@getComment').its('response.statusCode')
       .should('be.oneOf',[200, 304])
    })
})