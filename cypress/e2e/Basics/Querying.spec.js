
const environment = Cypress.env(`environment`);
const domain = Cypress.env().test.baseUrl;

describe('Querying Tests', () => {
    let user;
    beforeEach(function () {
        cy.fixture('userDatas/' + environment).then((user_data) => {
            user = user_data;
            cy.clearLocalStorage()
            cy.visit(domain)
            const title = user.general.title;
            cy.is_website_load_successfully(domain, title)
        })
    })
    // To query for the button, use the cy.get() command.
    it('Test querying cy.get() contents', () => {
        cy.get('.home-list').find('li:nth-child(1)').find('a').contains('Querying').click()
        cy.get('#query-btn').should('contain', 'Button');
        cy.get('.query-btn').should('contain', 'Button');
        cy.get('#querying .well>button:last').should('contain', 'Submit')
        cy.get('[data-test-id="test-example"]').should('have.class', 'example')
        cy.get('[data-test-id="test-example"]')
            .invoke('attr', 'data-test-id')
            .should('eq', 'test-example')
    })

    // We can find elements by their content using cy.contains()
    it('Test querying cy.contains() contents', () => {
        cy.get('.home-list').find('li:nth-child(1)').find('a').contains('Querying').click()
        cy.get('.query-list').contains('bananas').should('have.class', 'third')
        cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third')
        cy.get('#querying').contains('ul', 'oranges').should('have.class', 'query-list')
        cy.get('.query-button').contains('Save Form').should('have.class', 'btn')
    })

    // We can find elements within a specific DOM element .within()
    it('Test querying .within() contents', () => {
        cy.get('.home-list').find('li:nth-child(1)').find('a').contains('Querying').click()
        cy.get('.query-form').within(() => {
            cy.get('input:first').should('have.attr', 'placeholder', 'Email')
            cy.get('input:last').should('have.attr', 'placeholder', 'Password')
        })
    })

    // We can find the root DOM element cy.root()
    it('Test querying cy.root() contents', () => {
        cy.get('.home-list').find('li:nth-child(1)').find('a').contains('Querying').click()
        cy.root().should('match', 'html')
        cy.get('.query-ul').within(()=>{
            cy.root().should('have.class','query-ul')
        })

    })

})