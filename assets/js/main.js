'use strict';

class TicTacToe {
  constructor() {
    this.board = new Array(9).fill(null);
    this.currentPlayer = 'X';

    // Target DOM elements
    this.cells = document.querySelectorAll('.cell');
    this.messageEl = document.querySelector('#message');
    this.restartBtn = document.querySelector('#restart');

    this.gameOver = false;

    // Add event listeners
    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleClick(index));
    });
    this.restartBtn.addEventListener('click', () => this.restartGame());
    window.addEventListener('load', () => this.loadGameState());
  }

  handleClick(index) {
    if (this.board[index] || this.gameOver) return;

    this.board[index] = this.currentPlayer;
    this.cells[index].textContent = this.currentPlayer;

    if (this.checkWin()) {
      this.messageEl.textContent = `${this.currentPlayer} wins!`;
      this.gameOver = true;
    } else if (this.board.every((cell) => cell !== null)) {
      this.messageEl.textContent = `It's a draw!`;
      this.gameOver = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    this.saveGameState();
  }

  checkWin() {
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

    for (const pattern of winningCombinations) {
      const [a, b, c] = pattern;
      if (
        this.board[a] !== null &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true;
      }
    }

    return false;
  }

  restartGame() {
    this.board = new Array(9).fill(null);
    this.cells.forEach((cell) => (cell.textContent = ''));
    this.currentPlayer = 'X';
    this.messageEl.textContent = '';
    this.gameOver = false;

    this.saveGameState();
  }

  saveGameState() {
    const gameState = {
      board: this.board,
      currentPlayer: this.currentPlayer,
      message: this.messageEl.textContent,
      gameOver: this.gameOver,
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const gameState = JSON.parse(savedState);
      this.board = gameState.board;
      this.currentPlayer = gameState.currentPlayer;
      this.messageEl.textContent = gameState.message;
      this.gameOver = gameState.gameOver;
    }

    this.updateUI();
  }

  updateUI() {
    this.cells.forEach((cell, index) => {
      cell.textContent = this.board[index] || '';
    });
  }
}

const game = new TicTacToe();
