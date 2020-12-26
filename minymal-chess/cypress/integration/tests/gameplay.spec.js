context('Onload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Player can complete move', () => {
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
    });

    it('Computer move is reflected on screen', () => {
        cy.fixture('stubs').then((stubs) => {
            cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', stubs.opening_black_knight_response).as('CPUMove');
            cy.get('#board #e2 img[alt="white pawn"]').click();
            cy.get('#board #e4 img[alt="circle"]').click();
            cy.wait('@CPUMove');
            cy.get('#board #f6 img').should('have.attr', 'alt', 'black knight');
        });
    });

    it('When player is black, computer moves first', () => {
        cy.fixture('stubs').then((stubs) => {
            cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', stubs.opening_white_pawn).as('CPUMove');
            cy.get('button[id="restart"]').click();
            cy.get('#restart-modal button[id="modal-action"]').click();
            cy.get('#start-modal button[id="player-black"]').click();
            cy.get('#start-modal button[id="modal-action"]').click();
            cy.wait('@CPUMove');
            cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
        });
    });

    it('Player is able to promote pawn', () => {
        assert(false);
    });

    it('Computer is able to promote pawn', () => {
        assert(false);
    });

    it('Restart modal is shown when computer checkmates', () => {
        cy.fixture('stubs').then((stubs) => {
            cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', stubs.one_before_black_two_rook_checkmate).as('boardStart');
            cy.intercept('PUT', 'http://localhost:5000/chess/api/cpumove', stubs.black_two_rook_checkmate).as('CPUMove');
            cy.visit('http://localhost:3000/');
            cy.wait('@boardStart');
            cy.get('#board #h8 img[alt="white king"]').click();
            cy.get('#board #g8 img[alt="circle"]').click();
            cy.wait('@CPUMove');
            cy.get('#restart-modal #modal-body').should('have.text', 'The computer won the game this time. Try again?');
        });
    });

    it('Restart modal is shown when player checkmates', () => {
        cy.fixture('stubs').then((stubs) => {
            cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', stubs.one_before_white_two_rook_checkmate).as('boardStart');
            cy.visit('http://localhost:3000/');
            cy.wait('@boardStart');
            cy.get('#board #f2 img[alt="white rook"]').click();
            cy.get('#board #f8 img[alt="circle"]').click();
            cy.get('#restart-modal #modal-body').should('have.text', 'You beat the computer! Play again?');
        });
    });

    it('Restart modal is shown when game ends in a draw', () => {
        cy.fixture('stubs').then((stubs) => {
            cy.intercept('GET', 'http://localhost:5000/chess/api/initboard', stubs.one_before_white_two_rook_draw).as('boardStart');
            cy.visit('http://localhost:3000/');
            cy.wait('@boardStart');
            cy.get('#board #f2 img[alt="white rook"]').click();
            cy.get('#board #g2 img[alt="circle"]').click();
            cy.get('#restart-modal #modal-body').should('have.text', 'The game ended in a draw. Try again?');
        });
    });
});
