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
            cy.get('.home-list').find('li:nth-child(8)').find('a').contains('Assertions').click()
        })
    })

    // To make an assertion about the current subject, use the .should() command.
    it('Test assertion .should() command', () => {
        cy.get('.assertion-table').find('tbody tr:last').should('have.class', 'success')
            .find('td').first()
            .should('have.text', 'Column content')
            .should('contain', 'Column content')
            .should('have.html', 'Column content')
            .should('match', 'td')
            .invoke('text').should('match', /column content/i)
        cy.get('.assertion-table').find('tbody tr:last').contains('td', /column content/i)
            .should('be.visible')
    })

    // To chain multiple assertions together, use the .and() command.
    it('Test assertion .and() command', () => {
        cy.get('.assertions-link').should('have.class', 'active')
            .and('have.attr', 'href')
            .and('include', 'cypress.io')
    })

    // To write your own complicated checks using .should(cb) function (callback)
    it('Test assertion .should(cb) command', () => {
        cy.get('.assertions-p').find('p')
            .should(($p) => {
                let texts = $p.map((i, el) =>
                    Cypress.$(el).text())
                texts = texts.get()
                expect(texts).to.have.length(3)

                expect(texts, 'has expected text in each paragraph')
                    .to.deep.eq([
                        'Some text from first p',
                        'More text from second p',
                        'And even more text from third p'
                    ])
            })
    })

    // To Assert that element's class includes heading-.
    it('Test assertion heading- command', () => {
        cy.get('.docs-header').find('div')
        .should(($div)=>{
            expect($div).to.have.length(1)
            const className = $div[0].className
            expect(className).to.match(/heading-/)
        })
        .then(($div)=>{
            expect($div).to.have.text('Introduction')
        })    
    })

     // To Save the value from the first element, then compare it from a should(cb) callback.
     it('Test assertion compare value', () => {
          let text;
          const normalizeText = (s) => s.replace(/\s/g,'').toLowerCase()
          cy.get('.two-elements').find('.first')
          .then(($first)=>{
            text = normalizeText($first.text())
          })
          cy.get('.two-elements').find('.second')
          .should(($div)=>{
            const secondText = normalizeText($div.text())
            expect(secondText,'second text').to.equal(text)
          })
    })

    // To retry multiple operations.
    it.only('Test assertion random number', () => {
       cy.get('#random-number')     
       .should(($div)=>{
        const n = parseFloat($div.text())
        expect(n).to.be.gte(1).and.be.lte(10)
       })
  })
})