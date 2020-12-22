context('Onload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Player can complete move', () => {
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
        cy.wait(1000);
    });

    it('Computer move is reflected on screen', () => {
        cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', {
            statusCode: 200,
            body: { fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2', moves: {}, game_over: '' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('CPUMove');
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.wait('@CPUMove');
        cy.get('#board #f6 img').should('have.attr', 'alt', 'black knight');
        cy.wait(1000);
    });

    it('When player is black, computer moves first', () => {
        cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', {
            statusCode: 200,
            body: { fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2', moves: {}, game_over: '' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('CPUMove');
        cy.get('button[id="restart"]').click();
        cy.get('#restart-modal button[id="modal-action"]').click();
        cy.get('#start-modal button[id="player-black"]').click();
        cy.get('#start-modal button[id="modal-action"]').click();
        cy.wait('@CPUMove');
        cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
        cy.wait(1000);
    });

    it('Player is able to promote pawn', () => {
        assert(false);
    });

    it('Computer is able to promote pawn', () => {
        assert(false);
    });

    it('Restart modal is shown when computer checkmates', () => {
        cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', {
            statusCode: 200,
            body: { fen: '7K/r7/8/8/8/8/4r3/8 w - - 1 2', moves: { h8: ['g8'] }, game_over: '' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('boardStart');
        cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', {
            statusCode: 200,
            body: { fen: '4r1K1/r7/8/8/8/8/8/8 w - - 1 2', moves: {}, game_over: 'computer' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('CPUMove');
        cy.visit('http://localhost:3000/');
        cy.wait('@boardStart');
        cy.get('#board #h8 img[alt="white king"]').click();
        cy.get('#board #g8 img[alt="circle"]').click();
        cy.wait('@CPUMove');
        cy.get('#restart-modal #modal-body').should('have.text', 'The computer won the game this time. Try again?');
        cy.wait(1000);
    });

    it('Restart modal is shown when player checkmates', () => {
        cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', {
            statusCode: 200,
            body: { fen: '7k/R7/8/8/8/8/5R2/8 w - - 1 2', moves: { f2: ['f8'] }, game_over: '' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('boardStart');
        cy.visit('http://localhost:3000/');
        cy.wait('@boardStart');
        cy.get('#board #f2 img[alt="white rook"]').click();
        cy.get('#board #f8 img[alt="circle"]').click();
        cy.get('#restart-modal #modal-body').should('have.text', 'You beat the computer! Play again?');
        cy.wait(1000);
    });

    it('Restart modal is shown when game ends in a draw', () => {
        cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', {
            statusCode: 200,
            body: { fen: '7k/R7/8/8/8/8/5R2/8 w - - 1 2', moves: { f2: ['g2'] }, game_over: '' },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500
        }).as('boardStart');
        cy.visit('http://localhost:3000/');
        cy.wait('@boardStart');
        cy.get('#board #f2 img[alt="white rook"]').click();
        cy.get('#board #g2 img[alt="circle"]').click();
        cy.get('#restart-modal #modal-body').should('have.text', 'The game ended in a draw. Try again?');
        cy.wait(1000);
    });
});
