from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from waitress import serve
import chess
import random


app = Flask(__name__)
api = Api(app)
cors = CORS(app)


def parse_board_fen(board):
    board = board.split(' ')[0]
    ranks = board.split('/')
    parsed_board = []
    for rank in ranks:
        parsed_rank = []
        for piece in rank:
            if not piece.isdigit():
                parsed_rank.append(piece)
            else:
                parsed_rank += [None] * int(piece)
        parsed_board.append(parsed_rank)
    return parsed_board


def update_id_board(parsed_board, id_board):
    updated_board = []
    changed_pieces = []
    changed_spaces = []
    for i in range(len(id_board)):
        updated_rank = []
        for j in range(len(id_board)):
            piece_id = id_board[i][j]
            parsed_id = parsed_board[i][j]
            if parsed_id == piece_id:
                updated_rank.append(piece_id)
            elif piece_id and parsed_id == piece_id[0]:
                updated_rank.append(piece_id)
            else:
                if parsed_id is not None:
                    changed_spaces.append((parsed_id, i, j))
                else:
                    changed_pieces.append((piece_id))
                updated_rank.append(None)
        updated_board.append(updated_rank)
    for changed_space in changed_spaces:
        for changed_piece in changed_pieces:
            if changed_piece[0] == changed_space[0]:
                updated_board[changed_space[1]][changed_space[2]] = changed_piece
                break
    return updated_board


def init_piece_ids(parsed_board):
    piece_ids = {}
    id_board = []
    for rank in parsed_board:
        id_rank = []
        for piece in rank:
            if piece:
                if piece in piece_ids.keys():
                    piece_ids[piece] += 1
                else:
                    piece_ids[piece] = 1
                id_rank.append('{}{}'.format(piece, str(piece_ids[piece])))
            else:
                id_rank.append(None)
        id_board.append(id_rank)
    return id_board


class InitBoard(Resource):
    def get(self):
        board = chess.Board()
        return {
            'board': init_piece_ids(parse_board_fen(board.fen())),
            'fen': board.fen()
        }


class UpdateBoard(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)
        self.parser.add_argument('move', type=str, required=True)
        self.parser.add_argument(
            'board',
            type=list,
            required=True,
            location='json'
        )

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        move = args['move']
        current_board = request.json['board']
        board = chess.Board(fen)
        board.push(chess.Move.from_uci(move))
        random_index = random.randint(0, len(list(board.legal_moves)) - 1)
        board.push(list(board.legal_moves)[random_index])
        return {
            'board': update_id_board(parse_board_fen(board.fen()), current_board),
            'fen': board.fen()
        }


class GetMoveList(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)
        self.parser.add_argument('square', type=str, required=True)

    def get(self):
        return {
            'app': 'THIS IS WORKING'
        }

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        square = args['square']
        move_list = []
        board = chess.Board(fen)
        for move in list(board.legal_moves):
            start_square = chess.square_name(move.from_square)
            if start_square == square:
                move_list.append(chess.square_name(move.to_square))
        return move_list


api.add_resource(InitBoard, '/api/initboard')
api.add_resource(UpdateBoard, '/api/updateboard')
api.add_resource(GetMoveList, '/api/movelist')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port='5000')
    # app.run(threaded=True, host='0.0.0.0', port=5000)
    # app.run()
