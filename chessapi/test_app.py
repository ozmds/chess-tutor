from app import init_board


def test_init_board():
    assert init_board() == {
        'fen': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        'moves': {
            'a2': ['a3', 'a4'],
            'b2': ['b3', 'b4'],
            'c2': ['c3', 'c4'],
            'd2': ['d3', 'd4'],
            'e2': ['e3', 'e4'],
            'f2': ['f3', 'f4'],
            'g2': ['g3', 'g4'],
            'h2': ['h3', 'h4'],
            'b1': ['c3', 'a3'],
            'g1': ['h3', 'f3'],
        }
    }
