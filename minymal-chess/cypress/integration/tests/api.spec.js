context('Verifying API Endpoints', () => {
    it('Initalize Board', () => {
        cy.request('GET', 'https://minymal.app/chess/api/initboard').then((res) => {
            expect(res.body).property('fen').to.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(res.body).property('moves').to.eql({
                a2: ['a3', 'a4'],
                b2: ['b3', 'b4'],
                c2: ['c3', 'c4'],
                d2: ['d3', 'd4'],
                e2: ['e3', 'e4'],
                f2: ['f3', 'f4'],
                g2: ['g3', 'g4'],
                h2: ['h3', 'h4'],
                b1: ['c3', 'a3'],
                g1: ['h3', 'f3']
            });
        });
    });

    it('Update Board With Player Move', () => {
        cy.request('PUT', 'https://minymal.app/chess/api/updateboard', {
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            move: 'e2e4'
        }).then((res) => {
            expect(res.body).property('fen').to.equal('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
            expect(res.body).property('game_over').to.equal('');
        });
    });

    it('Update Board With Computer Move', () => {
        cy.request('PUT', 'https://minymal.app/chess/api/cpumove', {
            fen: '4K3/1r6/5r2/8/8/8/8/8 w - - 0 1'
        }).then((res) => {
            expect(res.body).property('fen').to.equal('3K4/1r6/5r2/8/8/8/8/8 b - - 1 1');
            expect(res.body).property('game_over').to.equal('');
            expect(res.body).property('moves').to.eql({
                b7: [
                    'b8', 'h7', 'g7', 'f7', 'e7', 'd7', 'c7',
                    'a7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'
                ],
                f6: [
                    'f8', 'f7', 'h6', 'g6', 'e6', 'd6', 'c6',
                    'b6', 'a6', 'f5', 'f4', 'f3', 'f2', 'f1'
                ]
            });
        });
    });
});
