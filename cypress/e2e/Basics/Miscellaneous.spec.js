// Examples of miscellaneous commands

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

            cy.get('.home-list').find('li:nth-child(9)').find('a').contains('Misc').scrollIntoView().click()
        })
    })

    // To end the command chain, use the .end() command.
    it('Test miscellaneous .end() command', () => {
        cy.get('.misc-table').within(()=>{
            cy.contains('Charles').click().end()
            cy.contains('Charles').click()
        })
    })

    // To execute a system command, use the cy.exec() command.
    it('Test miscellaneous cy.exec() command', () => {
        cy.exec('echo Jane Lane').its('stdout').should('contain','Jane Lane')
        cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)
        if(Cypress.platform==='win32') {
            cy.exec('print cypress.config.js')
            .its('stderr').should('be.empty')
        }else{
            cy.exec('cat cypress.config.js')
            .its('stderr').should('be.empty')

            cy.exec('pwd').its('code').should('eq', 0)
        }
    })

    // To get the DOM element that has focus, use the cy.focused() command.
    it('Test miscellaneous cy.focused() command', () => {
        cy.get('.misc-form').find('#name').click().type('Adem')
        cy.focused().should('have.id','name')
        cy.get('.misc-form').find('#description').click()
        cy.focused().should('have.id','description')
    })

    // To take a screenshot, use the cy.screenshot() command.
    it('Test miscellaneous cy.screenshot() command', () => {
        cy.screenshot('my-image')
    })

    // To wrap an object, use the cy.wrap() command.
    it('Test miscellaneous cy.wrap() command', () => {
        cy.wrap({foo: 'bar'}).should('have.property','foo').and('include','bar')
    })
})