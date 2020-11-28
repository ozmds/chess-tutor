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

    it('Board is present', () => {
        cy.get('#board > div > div').should('have.length', 64);
    });

    it('Make first white move', () => {
        cy.get('#board #e2 img[alt="white pawn"]').click();
        cy.get('#board #e4 img[alt="circle"]').click();
        cy.get('#board #e4 img').should('have.attr', 'alt', 'white pawn');
    });
});
