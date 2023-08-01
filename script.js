// store the board status as an array inside game object
// players info stored in objects
// object to control gameflow

// gameboard and gameflow can use modules
// players can be created with factories

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const changeName = (newName) => {
    name = newName;
  };
  return {
    getName,
    getMarker,
    changeName,
  };
};

const gameBoard = (() => {
  const resetBoard = () => {
    for (let i = 0; i < size; i++) {
      board[i] = cell;
    }
  };

  const addMarker = (marker, position) => {
    // check if cell is already occupied
    if (board[position] === 0) {
      board[position] = marker;
      return "mark added to board";
    }
  };

  const getBoard = () => board;

  const size = 9;
  const board = [];
  const cell = 0;

  resetBoard();

  return {
    getBoard,
    resetBoard,
    addMarker,
  };
})();

const gameFlow = (() => {
  const players = [player("Player One", 1), player("Player Two", 2)];
  let activePlayer = players[0];

  const switchTurn = () => {
    activePlayer === players[0]
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };
  const getActivePlayer = () => activePlayer;

  const startGame = (playerOneName, playerTwoName) => {
    players[0].changeName(playerOneName);
    players[1].changeName(playerTwoName);
    gameBoard.resetBoard();
    activePlayer = players[0];
    boardDom.updateBoard();
  };

  const endRound = () => {
    boardDom.changeDisplayTurn(
      "Press Restart or Choose a new tile to play again!"
    );
    gameBoard.resetBoard();
    activePlayer = players[0];
  };

  // Check board array for win conditions
  const checkBoard = () => {
    if (
      (gameBoard.getBoard()[0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[2] === activePlayer.getMarker()) || // Win condition #1
      (gameBoard.getBoard()[0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[3] === activePlayer.getMarker() &&
        gameBoard.getBoard()[6] === activePlayer.getMarker()) || // Win condition #2
      (gameBoard.getBoard()[0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[4] === activePlayer.getMarker() &&
        gameBoard.getBoard()[8] === activePlayer.getMarker()) || // Win condition #3
      (gameBoard.getBoard()[2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[5] === activePlayer.getMarker() &&
        gameBoard.getBoard()[8] === activePlayer.getMarker()) || // Win condition #4
      (gameBoard.getBoard()[2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[4] === activePlayer.getMarker() &&
        gameBoard.getBoard()[6] === activePlayer.getMarker()) || // Win condition #5
      (gameBoard.getBoard()[8] === activePlayer.getMarker() &&
        gameBoard.getBoard()[7] === activePlayer.getMarker() &&
        gameBoard.getBoard()[6] === activePlayer.getMarker()) || // Win condition #6
      (gameBoard.getBoard()[4] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[7] === activePlayer.getMarker()) || // Win condition #7
      (gameBoard.getBoard()[4] === activePlayer.getMarker() &&
        gameBoard.getBoard()[3] === activePlayer.getMarker() &&
        gameBoard.getBoard()[5] === activePlayer.getMarker()) // Win condition #8
    ) {
      boardDom.updateBoard();
      boardDom.displayRoundStatus(`${activePlayer.getName()} Wins!!!`);
      return "win";
    } else if (!gameBoard.getBoard().includes(0)) {
      // check for available space in the board
      boardDom.updateBoard();
      boardDom.displayRoundStatus("Stalemate!");
      return "draw";
    }
  };

  const playRound = (boardPosition) => {
    if (!gameBoard.addMarker(activePlayer.getMarker(), boardPosition)) return;
    if (checkBoard()) return endRound();
    switchTurn();
    boardDom.updateBoard();
  };

  return {
    playRound,
    getActivePlayer,
    startGame,
  };
})();

const boardDom = (() => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const board = gameBoard.getBoard();
  const turnDisplay = document.querySelectorAll(".turn-display");
  const roundDisplay = document.querySelector(".round-status");
  const main = document.querySelector(".main");
  const form = document.querySelector("form");
  const formButton = document.querySelector("#form-button");
  const nameInput = document.querySelectorAll("input[type='text']");
  const resetButton = document.querySelector("#reset");

  formButton.addEventListener("click", (e) => {
    nameInput[0].value === "" ? (nameInput[0].value = "Player One") : "";
    nameInput[1].value === "" ? (nameInput[1].value = "Player Two") : "";

    e.preventDefault();
    form.classList.toggle("not-visible");
    main.classList.toggle("not-visible");
    gameFlow.startGame(nameInput[0].value, nameInput[1].value);
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const boardPosition = cells.indexOf(cell);
      gameFlow.playRound(boardPosition);
      cell.classList.remove("hover");
    });
  });

  resetButton.addEventListener("click", () => {
    form.classList.toggle("not-visible");
    main.classList.toggle("not-visible");
    changeDisplayTurn();
    displayRoundStatus("");
    nameInput.forEach((name) => {
      name.value = "";
    });
  });

  const updateBoard = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 1) {
        cells[i].textContent = "X";
      } else if (board[i] === 2) {
        cells[i].textContent = "O";
      } else cells[i].textContent = "";
    }
    displayTurn();
    displayRoundStatus("");
  };

  const displayTurn = () => {
    let activePlayer = gameFlow.getActivePlayer();
    activePlayer.getMarker() === 1 ? (marker = "X") : (marker = "O");
    turnDisplay[0].textContent = `${activePlayer.getName()} Turn`;
    turnDisplay[1].textContent = `Using: ${marker}`;
  };

  const changeDisplayTurn = (message = "") => {
    turnDisplay[0].textContent = "";
    turnDisplay[1].textContent = message;
  };

  const displayRoundStatus = (message) => {
    roundDisplay.textContent = message;
  };
  return {
    updateBoard,
    displayRoundStatus,
    changeDisplayTurn,
  };
})();
