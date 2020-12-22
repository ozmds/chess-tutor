from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from waitress import serve
import chess
import random


app = Flask(__name__)
api = Api(app)
cors = CORS(app)


def get_move_list(board):
    move_list = {}
    for move in list(board.legal_moves):
        start_square = chess.square_name(move.from_square)
        if start_square in move_list.keys():
            move_list[start_square].append(chess.square_name(move.to_square))
        else:
            move_list[start_square] = [chess.square_name(move.to_square)]
    return move_list


def is_game_over(board, player_move=False):
    result = board.result()
    if player_move and result in ['1-0', '0-1']:
        return 'player'
    elif not player_move and result in ['1-0', '0-1']:
        return 'computer'
    elif result == '1/2-1/2':
        return 'draw'
    else:
        return ''


def get_player_move(move, promotedpiece):
    move = chess.Move.from_uci(move)
    if promotedpiece != '':
        move.promotion = chess.Piece.from_symbol(promotedpiece)
    return move


class InitBoard(Resource):
    def get(self):
        board = chess.Board()
        return {
            'fen': board.fen(),
            'moves': get_move_list(board)
        }


class UpdateBoard(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)
        self.parser.add_argument('move', type=str, required=True)
        self.parser.add_arguemnt('promotedpiece', type=str, required=True)

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        move = args['move']
        piece = args['piece']
        board = chess.Board(fen)
        board.push(get_player_move(move, piece))
        return {
            'fen': board.fen(),
            'game_over': is_game_over(board, player_move=True)
        }


class CPUMove(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        board = chess.Board(fen)
        random_index = random.randint(0, len(list(board.legal_moves)) - 1)
        board.push(list(board.legal_moves)[random_index])
        return {
            'fen': board.fen(),
            'moves': get_move_list(board),
            'game_over': is_game_over(board, player_move=False)
        }


api.add_resource(InitBoard, '/chess/api/initboard')
api.add_resource(UpdateBoard, '/chess/api/updateboard')
api.add_resource(CPUMove, '/chess/api/cpumove')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port='5000')
