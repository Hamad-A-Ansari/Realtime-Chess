const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");
// Import chess.js
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);

// Initialize the chess game instance
const chess = new Chess();  // Fix: Define the chess object here

let players = {};
let currentPlayer = "w";

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html from the root directory
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", function(uniquesocket) {
    console.log(`New connection: ${uniquesocket.id}`);

    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    // Emit the current board state when a new connection is made
    uniquesocket.emit("boardState", chess.fen());  // Fix: chess is now defined

    uniquesocket.on("disconnect", function() {
        if (uniquesocket.id == players.white) {
            delete players.white;
        } else if (uniquesocket.id == players.black) {
            delete players.black;
        }
    });

    uniquesocket.on("move", (move) => {
        try {
            if (chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());  // Broadcast updated board state to all players
            } else {
                console.log("invalid move: ", move);
                uniquesocket.emit("invalid move", move);
            }
        } catch (err) {
            console.log(err);
            uniquesocket.emit("invalid move: ", move);
        }
    });
});

server.listen(3000, function() {
    console.log("listening on port 3000");
});
