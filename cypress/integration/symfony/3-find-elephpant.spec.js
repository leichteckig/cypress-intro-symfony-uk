// describe = like a frame to structure your test fine, important for hooks
    describe('Find our lovely elephpant at symfony s store', () => {
        // Hook
        beforeEach(() => {
            cy.visit('/');
        })

        // Actual test
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

            // Open elephpant page
            cy.get('.featured-products').click();
            cy.get('.product.grid__item img').first()
                .click({force: true});

            // Here the actual waiting happens: It waits for the tagged request...
            cy.wait('@recommendCall').then((xhr) => {

                // ... and afterwards, you're able to access everything concerning the requests and use assertions,
                // e.g. checking the status code (waiting itself only waits for the request!)
                expect(xhr).to.have.property('status', 200);

                // In addition, I like to use assertions in order to wait for changes in the UI
                cy.get('h1').contains('PRE-ORDER: Collector 15y.o / Big Symfony elePHPant / Grey color');
            })
        });
    });
