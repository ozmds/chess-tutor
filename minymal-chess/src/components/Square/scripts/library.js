/* eslint-disable no-multi-spaces */

import blackPawn from '../../../static/black_pawn.svg';
import blackBishop from '../../../static/black_bishop.svg';
import blackKnight from '../../../static/black_knight.svg';
import blackRook from '../../../static/black_rook.svg';
import blackQueen from '../../../static/black_queen.svg';
import blackKing from '../../../static/black_king.svg';
import whitePawn from '../../../static/white_pawn.svg';
import whiteBishop from '../../../static/white_bishop.svg';
import whiteKnight from '../../../static/white_knight.svg';
import whiteRook from '../../../static/white_rook.svg';
import whiteQueen from '../../../static/white_queen.svg';
import whiteKing from '../../../static/white_king.svg';

const pieces = [
    { key: 'p', name: 'black pawn',   image: blackPawn   },
    { key: 'b', name: 'black bishop', image: blackBishop },
    { key: 'n', name: 'black knight', image: blackKnight },
    { key: 'r', name: 'black rook',   image: blackRook   },
    { key: 'q', name: 'black queen',  image: blackQueen  },
    { key: 'k', name: 'black king',   image: blackKing   },
    { key: 'P', name: 'white pawn',   image: whitePawn   },
    { key: 'B', name: 'white bishop', image: whiteBishop },
    { key: 'N', name: 'white knight', image: whiteKnight },
    { key: 'R', name: 'white rook',   image: whiteRook   },
    { key: 'Q', name: 'white queen',  image: whiteQueen  },
    { key: 'K', name: 'white king',   image: whiteKing   }
];

const getPiece = (pieceID) => {
    const pieceSymbol = pieceID[0];
    return pieces.filter((piece) => piece.key === pieceSymbol)[0];
};

export default getPiece;
