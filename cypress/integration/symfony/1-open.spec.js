// describe = like a frame to structure your test fine, important for hooks
describe('Open and find symfony.com- One heading and logo', () => {

    // Syntax mocha-like, maybe familiar

    // Hook, use after putting everything in the test
    beforeEach(() => {
        cy.visit('/');
    })

    // Actual test, see if the headline is actually 'Getting Started with Symfony'
    it('Find symfony.com heading - getting started', () => {
        // Use incorrect' string by purpose!
        cy.get('.symfony-intro').contains('Getting Started with Symfony');
    });

    // See if the logo contains the right image
    it('Check symfony.com logo', () => {
        cy.get('.header__logo > a > img') // Set selector (selector playground)
            .should('have.attr', 'src') // assert if the attr src is set
            .and('match', /header-logo.svg/); // chain the actual assertion: if the src matches the file name
    });
});
