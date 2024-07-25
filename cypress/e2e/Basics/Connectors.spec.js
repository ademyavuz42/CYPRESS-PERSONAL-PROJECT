// Examples of Connectors commands

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

            cy.get('.home-list').find('li:nth-child(10)').find('a').contains('Connectors').scrollIntoView().click()
        })
    })

    // To iterate over the elements of a current subject, use the .each() command.
    it('Test connectors .each() command', () => {
        cy.get('.connectors-each-ul li')
            .each(function ($el, index, $list) {
                console.log($el, index, $list)
            })
    })

    // To get the properties on the current subject, use the .its() command.
    it('Test connectors .its() command', () => {
        cy.get('.connectors-its-ul li').its('length').should('be.gt', 2)
    })

    // To invoke a function on a current subject, use the .invoke() command.
    it('Test connectors .invoke() command', () => {
        cy.get('.connectors-div').should('be.hidden')
            .invoke('show').should('be.visible')
    })

    // To spread an array as individual arguments to a callback function, use the .spread() command.
    it('Test connectors .spread() command', () => {
        const arr = ['foo', 'bar', 'baz']
        cy.wrap(arr).spread(function (foo, bar, baz) {
            expect(foo).to.eq('foo')
            expect(bar).to.eq('bar')
            expect(baz).to.eq('baz')
        })
    })

    // To spread an array as individual arguments to a callback function, use the .then() command.
    it('Test connectors .then() command', () => {
        cy.get('.connectors-list li').then(function ($lis) {
            expect($lis).to.have.length(3)
            expect($lis.eq(0)).to.contain('Walk the dog')
            expect($lis.eq(1)).to.contain('Feed the cat')
            expect($lis.eq(2)).to.contain('Write JavaScript')
            cy.wrap(1).then((num) => {
                expect(num).to.equal(1)
                return 2
            })
                .then((num) => {
                    expect(num).to.equal(2)
                })
            cy.wrap(1).then((num) => {
                expect(num).to.equal(1)
                cy.wrap(2)
            })
                .then((num) => {
                    expect(num).to.equal(2)
                })
        })
    })
})