context('Onload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('When restart modal is closed on an unfinished game, game can continue from previous state', () => {
    });

    it('When restart modal is closed on a finished game, no moves can be made, but board is not reset', () => {
    });

    it('When start modal is closed on an unfinished game, game has been reset to original position', () => {
    });

    it('When start modal is closed on a finished game, game has been reset to original position', () => {
    });

    it('When level is changed in start modal, level change is reflected on game page', () => {
    });

    it('When player changes colour to black, board is swapped so that black is on the bottom half of the screen', () => {
    });
});
