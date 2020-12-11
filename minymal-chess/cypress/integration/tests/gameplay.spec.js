context('Onload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Player can complete move', () => {
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
    });

    it('Request for computer move is made after player move', () => {
        cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove').as('CPUMove');
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.wait('@CPUMove').its('response.statusCode').should('equal', 200);
    });

    it('Computer move is reflected on screen', () => {
        cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', {
            statusCode: 200,
            body: { fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2', moves: {}, game_over: false },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('CPUMove');
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.wait('@CPUMove');
        cy.get('#board #f6 img').should('have.attr', 'alt', 'black knight');
    });

    it('Player is able to promote pawn', () => {
    });

    it('Computer is able to promote pawn', () => {
    });

    it('Restart modal is shown when computer checkmates', () => {
    });

    it('Restart modal is shown when player checkmates', () => {
    });

    it('Restart modal is shown when game ends in a draw', () => {
    });

    it('When player is black, computer moves first', () => {
    });
});
