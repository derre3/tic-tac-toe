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
  const size = 3;
  const board = [];
  const cell = 0;

  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i].push(cell);
    }
  }

  const addMarker = (marker, row, column) => {
    if (board[row][column] === 0) {
      board[row][column] = marker;
    }
  };

  const getBoard = () => board;

  return {
    getBoard,
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

  const newRound = () => {
    console.log(`${getActivePlayer().getName()} Turn`); //Placeholder log
  };

  const playRound = () => {
    console.table(gameBoard.getBoard()); // Placeholder display of the board
    gameBoard.addMarker(
      activePlayer.getMarker(),
      prompt("Pick a Row"),
      prompt("Pick a Column")
    );
    if (
      (gameBoard.getBoard()[0][0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[0][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[0][2] === activePlayer.getMarker()) || // Win condition #1
      (gameBoard.getBoard()[0][0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[2][0] === activePlayer.getMarker()) || // Win condition #2
      (gameBoard.getBoard()[0][0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[2][2] === activePlayer.getMarker()) || // Win condition #3
      (gameBoard.getBoard()[0][2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[2][2] === activePlayer.getMarker()) || // Win condition #4
      (gameBoard.getBoard()[0][2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[0][2] === activePlayer.getMarker()) || // Win condition #5
      (gameBoard.getBoard()[2][2] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[0][0] === activePlayer.getMarker()) || // Win condition #6
      (gameBoard.getBoard()[0][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[2][1] === activePlayer.getMarker()) || // Win condition #7
      (gameBoard.getBoard()[1][0] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][1] === activePlayer.getMarker() &&
        gameBoard.getBoard()[1][2] === activePlayer.getMarker()) // Win condition #8
    ) {
      console.table(gameBoard.getBoard()); // Placeholder display of the board
      return console.log(activePlayer.getName(), "Wins!!"); //Placeholder log
    }
    switchTurn();
    newRound();

    playRound();
  };

  return {
    playRound,
    getActivePlayer,
  };
})();
