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
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i].push(cell);
      }
    }
  };

  const addMarker = (marker, row, column) => {
    // check if cell is already occupied
    if (board[row][column] !== 0) {
      alert("Move not available, please try again"); //Placeholder alert
      gameFlow.playRound();
    }
    board[row][column] = marker;
  };

  const getBoard = () => board;

  const flattenBoard = () => {
    //flattens the 2d board array into a single array
    const board = gameBoard.getBoard();
    let arrBoard = [];
    board.forEach((row) => {
      row.forEach((cell) => {
        arrBoard.push(cell);
      });
    });
    return arrBoard;
  };

  const size = 3;
  const board = [];
  const cell = 0;
  resetBoard();

  return {
    getBoard,
    resetBoard,
    addMarker,
    flattenBoard,
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
        gameBoard.getBoard()[2][0] === activePlayer.getMarker()) || // Win condition #5
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
      console.log(activePlayer.getName(), "Wins!!"); //Placeholder log
      return "win";
    } else if (!gameBoard.flattenBoard().includes(0)) {
      // check for available space in the board
      console.log("Draw Game");
      return "draw";
    }
  };

  const playRound = () => {
    console.table(gameBoard.getBoard()); // Placeholder display of the board
    console.log(`${getActivePlayer().getName()} Turn`);
    gameBoard.addMarker(
      activePlayer.getMarker(),
      prompt("Pick a Row"),
      prompt("Pick a Column")
    );
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
