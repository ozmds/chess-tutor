import json
from updateboard import (
    get_player_move_options, is_game_over, add_move_to_fen, get_random_move,
    init_board, update_with_player_move, update_with_random_move
)


def read_json(filename):
    with open(filename) as json_file:
        return json.load(json_file)


data = read_json('./data.json')


def test_get_player_move_options():
    fen = data['fen']['starting']
    moves = data['movelist']['starting']
    assert get_player_move_options(fen) == moves


def test_is_game_over_player_win():
    assert is_game_over(data['fen']['black_checkmate'], True) == 'player'


def test_is_game_over_computer_win():
    assert is_game_over(data['fen']['black_checkmate'], False) == 'computer'


def test_is_game_over_draw():
    assert is_game_over(data['fen']['draw'], True) == 'draw'


def test_is_game_over_not_over():
    assert is_game_over(data['fen']['starting']) == ''


def test_add_move_to_fen():
    fen = data['fen']['opening_move']
    assert add_move_to_fen(data['fen']['starting'], 'e2e4') == fen


def test_get_random_move():
    fen = data['fen']['trapped_king']
    assert get_random_move(fen) in ['e8d8', 'e8f8']


def test_init_board():
    assert init_board() == {
        'fen': data['fen']['starting'],
        'moves': data['movelist']['starting']
    }


def test_update_with_player_move():
    fen = data['fen']['opening_move']
    assert update_with_player_move(data['fen']['starting'], 'e2e4') == {
        'fen': fen,
        'game_over': ''
    }


def test_update_with_random_move():
    fen = data['fen']['trapped_king']
    request_object = update_with_random_move(fen)
    assert request_object['game_over'] == ''
    assert request_object['fen'] == data['fen']['trapped_king_response']
    assert request_object['moves'] == {
        'b7': [
            'b8', 'h7', 'g7', 'f7', 'e7', 'd7', 'c7',
            'a7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'
        ],
        'f6': [
            'f8', 'f7', 'h6', 'g6', 'e6', 'd6', 'c6',
            'b6', 'a6', 'f5', 'f4', 'f3', 'f2', 'f1'
        ]
    }
