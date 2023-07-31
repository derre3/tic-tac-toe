// store the board status as an array inside game object
// players info stored in objects
// object to control gameflow

// gameboard and gameflow can use modules
// players can be created with factories

const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {
    getName,
    getMarker,
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
    if (board[position] !== 0) {
      alert("Move not available, please try again"); //Placeholder alert
      gameFlow.playRound();
    }
    board[position] = marker;
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
  const players = [player("John", 1), player("Jane", 2)];
  let activePlayer = players[0];

  const switchTurn = () => {
    activePlayer === players[0]
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };
  const getActivePlayer = () => activePlayer;

  const endRound = () => {
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
      console.log(gameBoard.getBoard()); // Placeholder display of the board
      console.log(activePlayer.getName(), "Wins!!"); //Placeholder log
      return "win";
    } else if (!gameBoard.getBoard().includes(0)) {
      // check for available space in the board
      console.log("Draw Game");
      return "draw";
    }
  };

  const playRound = () => {
    console.log(gameBoard.getBoard()); // Placeholder display of the board
    console.log(`${getActivePlayer().getName()} Turn`);
    gameBoard.addMarker(activePlayer.getMarker(), prompt("Pick Position"));
    if (!checkBoard()) {
      switchTurn();
      playRound();
    }
    return endRound();
  };

  return {
    playRound,
    getActivePlayer,
  };
})();
