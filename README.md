
# Realtime Chess Game


A real-time multiplayer chess game using HTML5, CSS3, JavaScript, and Tailwind CSS for the frontend. Leveraged Node.js, Express.js, and Socket.IO for the backend to enable real-time, bidirectional communication.

The game features role assignment for players (white, black, spectator) and move validation using Chess.js. Implemented a responsive, drag-and-drop interface for seamless gameplay across devices. This project showcases skills in full-stack development, real-time communication, and interactive UI design.

### How to Run the Chess Game Application from GitHub

To run the online chess game application locally, follow these steps:

1. **Clone the Repository**:
   - Open your terminal or command prompt.
   - Run the following command to clone the repository to your local machine:
     ```bash
     git clone https://github.com/Hamad-A-Ansari/Realtime-Chess.git
     ```

2. **Navigate to the Project Directory**:
   - Change your current directory to the project directory:
     ```bash
     cd Realtime-Chess
     ```

3. **Install Dependencies**:
   - Ensure you have Node.js and npm installed on your machine.
   - Install the required dependencies by running:
     ```bash
     npm install
     ```

4. **Start the Server**:
   - Start the server using the following command:
     ```bash
     npm start
     ```
   - The server will start and listen on port 3000 by default.

5. **Open the Application in Your Browser**:
   - Open your web browser and navigate to:
     ```
     http://localhost:3000
     ```

6. **Play the Game**:
   - You should see the chess game interface. You can open the same URL in a different browser or incognito window to connect as another player or spectator.

By following these steps, you will be able to run and play the chess game locally on your machine.

## How It Works

The online chess game application allows two players to play chess in real-time, with the option for additional users to spectate the game. Here's a brief overview of how it functions:

### 1. Client-Server Communication:

The client (browser) communicates with the server using Socket.IO. This allows real-time updates to be sent between the server and clients, ensuring the game state is synchronized for all players and spectators.

### 2. Game Logic:

The game logic is handled by Chess.js, which provides an API to manage the state of the chess game. This includes validating moves, tracking the game state, and handling special moves like castling and en passant.

### 3. User Roles:

When a user connects to the server, they are assigned a role based on availability:
The first user becomes the white player.
The second user becomes the black player.
Any additional users become spectators.
Roles are managed on the server and communicated to the clients via Socket.IO.

### 4. Board Rendering:

The client renders the chessboard using HTML and Tailwind CSS for styling. The pieces are displayed as images to ensure visual clarity.
The board is interactive, allowing players to drag and drop pieces to make moves.

### 5. Move Handling:

When a player makes a move, the client sends the move to the server via Socket.IO.
The server validates the move using Chess.js. If valid, the server updates the game state and broadcasts the new state to all connected clients.
All clients update their displayed board based on the new game state.
### 6. Synchronization:

The game state is consistently synchronized across all clients, ensuring that all players and spectators see the same board configuration.
This combination of technologies ensures a smooth and responsive chess-playing experience with real-time updates and accurate game logic.
## Acknowledgements

I would like to extend my sincere thanks to the following:

##### -[Chess.js](https://www.npmjs.com/package/chess.js/v/0.13.1) for providing a robust library to handle the game logic.
##### -[Socket.IO](https://cdnjs.com/libraries/socket.io) for enabling real-time bidirectional communication between web clients and servers.
##### -[Express](https://expressjs.com/) for facilitating the development of the web server.
##### -[Tailwind CSS](https://tailwindcss.com/) for making the styling of the application straightforward and efficient.
####

##### Your support and tools were instrumental in the successful development of this project. Thank you!
## API Reference

#### Get the main chess game interface

### Socket.IO Events
#### 1. Connection 
Handles new connections and assigns player roles.

```markdown
### Example Code Snippet

```javascript
const socket = io();

socket.on('connection', function (uniquesocket) {
  // Connection logic
});
```

#### 2. Disconnect
Manages player disconnection and updates roles
```markdown
### Example Code Snippet

```javascript
const socket = io();
  socket.on('disconnect', function () {
  // Disconnect logic
});
```
#### 3. Move
Validates and broadcasts player moves.
```markdown
### Example Code Snippet

```javascript
const socket = io();
  socket.emit('move', move);
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `move`      | `object` | **Required**. The move object containing source and target squares |

#### 4. Board State
Updates and broadcasts the current board state.

```markdown
### Example Code Snippet

```javascript
const socket = io();
  socket.on('boardState', function (fen) {
  // Board state update logic
});

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fen`      | `string` | **Required**. The FEN string representing the current board state |
