import chess
import random


piece_values = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 50
}


def get_highest_capture_move(fen, depth, max_depth, get_move=True):
    board = chess.Board(fen)
    legal_moves = list(board.legal_moves)
    move_values = []
    if depth == max_depth:
        move_values = [get_captured_value(board.fen(), move.uci()) for move in legal_moves]
    else:
        for move in legal_moves:
            move_value = get_captured_value(board.fen(), move.uci())
            move_board = chess.Board(fen)
            move_board.push(move)
            player_move = get_highest_capture_move(move_board.fen(), 1, 1)
            player_move_value = get_captured_value(move_board.fen(), player_move)
            move_board.push(chess.Move.from_uci(player_move))
            move_list = get_highest_capture_move(move_board.fen(), depth + 1, max_depth, get_move=False)
            if move_list:
                move_values.append(move_value - player_move_value + max(move_list))
            else:
                move_values.append(move_value - player_move_value)
    if get_move:
        return legal_moves[move_values.index(max(move_values))].uci()
    return move_values


def get_captured_value(fen, move):
    board = chess.Board(fen)
    move = chess.Move.from_uci(move)
    captured_piece = board.piece_type_at(move.to_square)
    if captured_piece:
        return piece_values[chess.piece_symbol(captured_piece).lower()]
    if move_is_en_passant_capture(board, move):
        return piece_values['p']
    else:
        return 0


def move_is_en_passant_capture(board, move):
    if not board.piece_type_at(move.from_square):
        return False
    moving_piece = chess.piece_symbol(board.piece_type_at(move.from_square)).lower()
    move_is_en_passant = board.ep_square == move.to_square
    return moving_piece == 'p' and move_is_en_passant


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
        'moves': get_player_move_options(board.fen())
    }


def update_with_player_move(fen, move):
    updated_fen = add_move_to_fen(fen, move)
    return {
        'fen': updated_fen,
        'game_over': is_game_over(updated_fen, player_move=True)
    }


def update_with_computer_move(fen, level):
    if level == 1:
        move = get_random_move(fen)
    else:
        move = get_highest_capture_move(fen, 1, level)
    updated_fen = add_move_to_fen(fen, move)
    return {
        'fen': updated_fen,
        'moves': get_player_move_options(updated_fen),
        'game_over': is_game_over(updated_fen)
    }
