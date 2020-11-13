# sample fen
# rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
# fen documentation
# https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation


def get_piece_placement_str_from_fen(fen):
    return fen.split(' ')[0]


def get_piece_placement_nested_list_from_fen(fen):
    piece_placement_str = get_piece_placement_str_from_fen(fen)
    rank_str_list = piece_placement_str.split('/')
    piece_placement_list = []
    for rank_str in rank_str_list:
        rank_list = []
        for piece in rank_str:
            if not piece.isdigit():
                rank_list.append(piece)
            else:
                rank_list += [None] * int(piece)
        piece_placement_list.append(rank_list)
    return piece_placement_list


