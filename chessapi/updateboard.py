import chess
import random


def get_player_move_options(fen):
    board = chess.Board(fen)
    move_list = {}
    for move in list(board.legal_moves):
        start_square = chess.square_name(move.from_square)
        if start_square in move_list.keys():
            move_list[start_square].append(chess.square_name(move.to_square))
        else:
            move_list[start_square] = [chess.square_name(move.to_square)]
    return move_list


def is_game_over(fen, player_move=False):
    board = chess.Board(fen)
    result = board.result()
    if player_move and result in ['1-0', '0-1']:
        return 'player'
    elif not player_move and result in ['1-0', '0-1']:
        return 'computer'
    elif result == '1/2-1/2':
        return 'draw'
    else:
        return ''


def add_move_to_fen(fen, move):
    board = chess.Board(fen)
    board.push(chess.Move.from_uci(move))
    return board.fen()


def get_random_move(fen):
    board = chess.Board(fen)
    random_index = random.randint(0, len(list(board.legal_moves)) - 1)
    return list(board.legal_moves)[random_index].uci()


def init_board():
    board = chess.Board()
    return {
        'fen': board.fen(),
        'moves': get_player_move_options(board)
    }


def update_with_player_move(fen, move):
    updated_fen = add_move_to_fen(fen, move)
    return {
        'fen': updated_fen,
        'game_over': is_game_over(updated_fen, player_move=True)
    }


def update_with_random_move(fen):
    random_move = get_random_move(fen)
    updated_fen = add_move_to_fen(fen, random_move)
    return {
        'fen': updated_fen,
        'moves': get_player_move_options(updated_fen),
        'game_over': is_game_over(updated_fen)
    }
