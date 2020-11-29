context('Onload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Header is present', () => {
        cy.get('h1[id="header"]').should('have.text', 'Minimalist Chess');
    });

    it('Move counter is present and has default value', () => {
        cy.get('#move-counter > h2').should('have.text', 'Move');
        cy.get('#move-counter > p').should('have.text', '1');
    });

    it('Level indicator is present and has default value', () => {
        cy.get('#level-indicator > h2').should('have.text', 'Level');
        cy.get('#level-indicator > p').should('have.text', '1');
    });

    it('Restart game button is present', () => {
        cy.get('button[id="restart"]').should('have.text', 'Restart Game');
    });

    it('Board is present and has 64 squares', () => {
        cy.get('#board > div > div').should('have.length', 64);
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

    it('Restart modal is shown when player checkmates', () => {
    });
});
