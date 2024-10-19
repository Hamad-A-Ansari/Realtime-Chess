const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement("img");
                pieceElement.classList.add("piece");
                pieceElement.src = getPieceImage(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });

    if (playerRole === 'b') {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q", // Always promote to a queen for simplicity
    };

    // Validate move before emitting
    const result = chess.move(move);
    if (result) {
        socket.emit("move", move);
    } else {
        console.log("Invalid move attempted:", move);
        // Optionally, give feedback to the user about the invalid move
    }
};

const getPieceImage = (piece) => {
    const pieceImages = {
        'p': 'bp.png', // Black pawn
        'r': 'br.png', // Black rook
        'n': 'bn.png', // Black knight
        'b': 'bb.png', // Black bishop
        'q': 'bq.png', // Black queen
        'k': 'bk.png', // Black king
        'P': 'wp.png', // White pawn
        'R': 'wr.png', // White rook
        'N': 'wn.png', // White knight
        'B': 'wb.png', // White bishop
        'Q': 'wq.png', // White queen
        'K': 'wk.png'  // White king
    };

    return `/images/${pieceImages[piece] || piece}`; // Get the image filename from the mapping
};

socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", function () {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", function (fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move", function (move) {
    chess.move(move);
    renderBoard();
});

renderBoard();