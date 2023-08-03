// player factory used by gameFlow
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

// gameBoard only manipulates the board array
//  also used by gameFlow
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

// game logic is stored here
const gameFlow = (() => {
  // default player names
  const players = [player("Player One", 1), player("Player Two", 2)];
  // starting player will always be Player One
  let activePlayer = players[0];

  const switchTurn = () => {
    activePlayer === players[0]
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };
  const getActivePlayer = () => activePlayer;

  // used by the start button in the DOM code section
  const startGame = (playerOneName, playerTwoName) => {
    players[0].changeName(playerOneName);
    players[1].changeName(playerTwoName);
    // resets activePlayer and board if restart button is pressed mid-game
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

  const checkWinCondition = (boardPosition) => {
    return boardPosition.every(
      (index) => gameBoard.getBoard()[index] === activePlayer.getMarker()
    );
  };

  // Check board array for win conditions
  const checkRoundStatus = () => {
    if (
      checkWinCondition([0, 1, 2]) || // Win condition #1
      checkWinCondition([0, 3, 6]) || // Win condition #2
      checkWinCondition([0, 4, 8]) || // Win condition #3
      checkWinCondition([2, 5, 8]) || // Win condition #4
      checkWinCondition([2, 4, 6]) || // Win condition #5
      checkWinCondition([8, 7, 6]) || // Win condition #6
      checkWinCondition([4, 1, 7]) || // Win condition #7
      checkWinCondition([4, 3, 5]) // Win condition #8
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
    // returns nothing if cell is not available
    if (!gameBoard.addMarker(activePlayer.getMarker(), boardPosition)) return;
    // check for round end conditions
    if (checkRoundStatus()) return endRound();
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
  // queries used by the DOM
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
    // if name input is empty, set default value
    nameInput[0].value === "" ? (nameInput[0].value = "Player One") : "";
    nameInput[1].value === "" ? (nameInput[1].value = "Player Two") : "";
    e.preventDefault();
    //when the name input is visible, the gameboard is not
    form.classList.toggle("not-visible");
    main.classList.toggle("not-visible");
    gameFlow.startGame(nameInput[0].value, nameInput[1].value);
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const boardPosition = cells.indexOf(cell);
      gameFlow.playRound(boardPosition);
    });
  });

  resetButton.addEventListener("click", () => {
    // go back to name input screen structure
    form.classList.toggle("not-visible");
    main.classList.toggle("not-visible");
    changeDisplayTurn();
    displayRoundStatus("");
    // resets nameInput to empty value
    nameInput.forEach((name) => {
      name.value = "";
    });
  });

  const updateBoard = () => {
    // gamelogic is using ints 1 and 2 for markers
    // this just translates 1 to X and 2 to O
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
    // translates the active player marker to a div on screen
    let activePlayer = gameFlow.getActivePlayer();
    activePlayer.getMarker() === 1 ? (marker = "X") : (marker = "O");
    turnDisplay[0].textContent = `${activePlayer.getName()} Turn`;
    turnDisplay[1].textContent = `Using: ${marker}`;
  };

  // displays the end round message to restart the game
  const changeDisplayTurn = (message = "") => {
    turnDisplay[0].textContent = "";
    turnDisplay[1].textContent = message;
  };

  // displays the end round message(win or stalemate)
  const displayRoundStatus = (message) => {
    roundDisplay.textContent = message;
  };
  return {
    updateBoard,
    displayRoundStatus,
    changeDisplayTurn,
  };
})();
