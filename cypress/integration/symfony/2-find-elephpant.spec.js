// describe = like a frame to structure your test fine, important for hooks
    describe('Find our lovely elephpant at symfony s store', () => {
        // Hook
        beforeEach(() => {
            cy.visit('/');
        })

        // Actual test, see if the headline is actually 'PHP Usergroup Muenster'
        it('Open elephpant\'s page', () => {
            // Define the request we want to wait for
            cy.server();
            cy.route({
                url: 'https://shop.symfony.com/recommendations/products?**',
                method: 'GET'
            }).as('recommendCall')

            // Navigate to store
            cy.get('a[href="https://shop.symfony.com/"]').scrollIntoView();
            cy.get('a[href="https://shop.symfony.com/"]').should('be.visible');
            cy.get('a[href="https://shop.symfony.com/"]').click();

            // Open elephpant site
            cy.get('.featured-products').click();
            cy.get('.product.grid__item img').first()
                .click({force: true});

            cy.wait('@recommendCall').then((xhr) => {
                expect(xhr).to.have.property('status', 200);

                cy.get('h1').contains('PRE-ORDER: Collector 15y.o / Big Symfony elePHPant / Grey color');
            })
        });
    });
