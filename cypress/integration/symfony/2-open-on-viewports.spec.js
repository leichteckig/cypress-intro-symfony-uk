// Array with devices to iterate (later)
const devices = [{
    model: 'macbook-15',
    orientation: 'portrait',
}, {
    model: 'ipad-2',
    orientation: 'portrait',
}, {
    model: 'iphone-6+',
    orientation: 'portrait',
}, {
    model: 'iphone-6+',
    orientation: 'landscape',
}];

describe('Open symfony.com site', () => {
    // We iterate though the array with the devices
    devices.forEach(device => {

        // Use an own context for better hook usage
        context(`On ${device.model}, ${device.orientation}`, () => {

            // Set viewport before tests
            beforeEach(() => {
                cy.viewport(device.model, device.orientation).then(() => {
                    cy.visit('/');
                });
            })

            it('Find symfony.com title', () => {
                // Use incorrect' string by purpose!
                cy.get('.symfony-intro').contains('Getting Started with Symfony');
            });

            // See if the logo contains the right image
            it('Check symfony.com logo', () => {
                cy.get('.header__logo > a > img') // Set selector (selector playground)
                    .should('have.attr', 'src') // assert if the attr src is set
                    .and('match', /header-logo.svg/); // chain the actual assertion: if the src matches the file name
            });
        })
    });
});
