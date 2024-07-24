const environment = Cypress.env(`environment`);
const domain = Cypress.env().test.baseUrl;

describe('Traversal Tests', () => {
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

    // To get children of DOM elements, use the .children() command.
    it('Test traversal .children() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data')
    })

    // To get the closest ancestor DOM element, use the .closest() command.
    it('Test traversal .closest() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')
    })

    // To get a DOM element at a specific index, use the .eq() command.
    it('Test traversal .eq() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-list li').eq(1).should('contain', 'siamese')
        cy.get('.traversal-list>li').eq(0).should('contain', 'tabby')
    })

    // To get DOM elements that match a specific selector, use the .filter() command.
    it('Test traversal .filter() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-nav li').filter('.active').should('contain', 'About')
    })

    // To get descendant DOM elements of the selector, use the .find() command.
    it('Test traversal .find() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)
    })

    // To get the first DOM element within elements, use the .first() command.
    it('Test traversal .first() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-table td').first().should('contain', '1')
    })

    // To get the last DOM element within elements, use the .last() command.
    it('Test traversal .last() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')
    })

    // To get the next sibling DOM element within elements, use the .next() command.
    it('Test traversal .next() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')
    })

    // To get all of the next sibling DOM elements within elements, use the .nextAll() command.
    it('Test traversal .nextAll() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-next-all').contains('oranges').nextAll().should('have.length', '3')
    })

    // To get all of the next sibling DOM elements within elements until another element, use the .nextUntil() command.
    it('Test traversal .nextUntil() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('#veggies').nextUntil('#nuts').should('have.length','3')
    })

    // To remove DOM element(s) from the set of elements, use the .not() command.
    it('Test traversal .not() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain','Disabled')
    })

    // To get parent DOM element of elements, use the .parent() command.
    it('Test traversal .parent() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-mark').parent().should('contain','Morbi leo risus')
    })

    // To get parents DOM element of elements, use the .parents() command.
    it('Test traversal .parents() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-cite').parents().should('match','blockquote')
    })

    // To get parents DOM element of elements until other element, use the .parentsUntil() command.
    it('Test traversal .parentsUntil() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav').should('have.length','2')
    })

    // To get the previous sibling DOM element within elements, use the .prev() command.
    it('Test traversal .prev() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.birds').find('.active').prev().should('contain','Lorikeets')
    })

    // To get all previous sibling DOM elements within elements, use the .prevAll() command.
    it('Test traversal .prevAll() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.fruits-list').find('.third').prevAll().should('have.length','2')
    })

    // To get all previous sibling DOM elements within elements until other element, use the .prevUntil() command.
    it('Test traversal .prevUntil() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.foods-list').find('#nuts').prevUntil('#veggies').should('have.length','3')
    })

     // To get all sibling DOM elements of elements, use the .siblings() command.
     it('Test traversal .siblings() command', () => {
        cy.get('.home-list').find('li:nth-child(2)').find('a').contains('Traversal').click()
        cy.get('.traversal-pills .active').siblings().should('have.length','2')
    })
})