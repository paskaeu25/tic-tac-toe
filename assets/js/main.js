'use strict';

class TicTacToe {
  constructor() {
    // Create an empty game board (an array to represent the cells)
    this.board = new Array(9).fill(null);

    // Initialize the current player (e.g., 'X').
    this.currentPlayer = 'X';

    // Get references to necessary HTML elements (cells, message area, restart button).
    this.gameStatus = document.querySelector('#gameStatus');
    this.cells = document.querySelectorAll('.cell');
    this.messageEl = document.querySelector('#message');
    this.restartBtn = document.querySelector('#restart');

    // Initialize a flag to track if the game is over (initially false).
    this.gameOver = false;

    // Add event listeners to each cell to trigger the handleClick method when clicked.
    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleClick(index));
    });
    // Add an event listener to the restart button to trigger the restartGame method when clicked.
    this.restartBtn.addEventListener('click', () => this.restartGame());
    // Add an event listener to load game state when the page loads
    window.addEventListener('load', () => this.loadGameState());
  }

  // Implement a method (e.g., handleClick) to respond to user clicks on the cells.
  handleClick(index) {
    // check if the clicked cell is already occupied or if the game is over. If yes, ignore the click.
    if (this.board[index] || this.gameOver) return;

    // Set the current player's symbol ('X' or 'O') in the clicked cell.
    this.board[index] = this.currentPlayer;
    this.cells[index].textContent = this.currentPlayer;

    // Check if the current player has won the game.
    if (this.checkWin()) {
      this.messageEl.textContent = `${this.currentPlayer} wins!`;
      this.gameOver = true;
    } else if (this.board.every((cell) => cell !== null)) {
      // Check if it's a draw (all cells are occupied).
      this.messageEl.textContent = `It's a draw!`;
      this.gameOver = true;
    } else {
      // Switch to the next player's turn.
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    this.saveGameState();
  }

  // Implement a method (e.g., checkWin) to check if a player has won.
  checkWin() {
    // Define an array of winning combinations (rows, columns, diagonals).
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Iterate through these combinations to check if any player has a winning combination.

    for (const pattern of winningCombinations) {
      const [a, b, c] = pattern;
      if (
        this.board[a] !== null &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true; // Return true if a win is detected
      }
    }

    return false; // false otherwise.
  }

  // Implement a method (e.g., restartGame) to reset the game state:
  restartGame() {
    // Clear the game board.
    this.board = new Array(9).fill(null);
    this.cells.forEach((cell) => (cell.textContent = ''));
    // Set the current player back to the starting player ('X').
    this.currentPlayer = 'X';
    // Clear the message area.
    this.messageEl.textContent = '';
    // Reset the game-over flag to false.
    this.gameOver = false;

    this.saveGameState();
  }

  saveGameState() {
    const gameState = {
      board: this.board,
      currentPlayer: this.currentPlayer,
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const gameState = JSON.parse(savedState);
      this.board = gameState.board;
      this.currentPlayer = gameState.currentPlayer;
    }
  }
}

const game = new TicTacToe();
