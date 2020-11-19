# sample fen
# rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
# fen documentation
# https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

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

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        move = args['move']
        board = chess.Board(fen)
        board.push(chess.Move.from_uci(move))
        return {
            'fen': board.fen(),
            'moves': get_move_list(board),
            'game_over': board.is_game_over()
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
            'game_over': board.is_game_over()
        }


api.add_resource(InitBoard, '/chess/api/initboard')
api.add_resource(UpdateBoard, '/chess/api/updateboard')
api.add_resource(CPUMove, '/chess/api/cpumove')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port='5000')
