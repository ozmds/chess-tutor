import { convertRankToList, convertFenToBoard, initBoard } from './helper';

test('empty row', () => {
    expect(convertRankToList('8')).toEqual(
        [null, null, null, null, null, null, null, null]
    );
});

test('full of pieces', () => {
    expect(convertRankToList('RNBQKBNR')).toEqual(
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    );
});

test('some pieces', () => {
    expect(convertRankToList('1RNB3K')).toEqual(
        [null, 'R', 'N', 'B', null, null, null, 'K']
    );
});

test('fen returns board', () => {
    expect(convertFenToBoard(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )).toEqual(
        [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
    );
});

test('fen returns board with ids', () => {
    expect(initBoard(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )).toEqual(
        [
            ['r1', 'n1', 'b1', 'q1', 'k1', 'b2', 'n2', 'r2'],
            ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
            ['R1', 'N1', 'B1', 'Q1', 'K1', 'B2', 'N2', 'R2']
        ]
    );
});
