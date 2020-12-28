from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from waitress import serve
from updateboard import (
    init_board, update_with_player_move, update_with_random_move
)

app = Flask(__name__)
api = Api(app)
cors = CORS(app)


class InitBoard(Resource):
    def get(self):
        return init_board()


class UpdateBoard(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)
        self.parser.add_argument('move', type=str, required=True)

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        move = args['move']
        return update_with_player_move(fen, move)


class CPUMove(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('fen', type=str, required=True)
        self.parser.add_argument('level', type=int, required=True)

    def put(self):
        args = self.parser.parse_args()
        fen = args['fen']
        return update_with_random_move(fen)


api.add_resource(InitBoard, '/chess/api/initboard')
api.add_resource(UpdateBoard, '/chess/api/updateboard')
api.add_resource(CPUMove, '/chess/api/cpumove')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port='5000')
    # app.run(debug=True)
