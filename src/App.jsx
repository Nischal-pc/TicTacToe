import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
// import { useMemo, useState } from "react";
import { useState } from "react";
import Log from "./components/Log";
import { WINNER_COMBINATIONS } from "./data/data.js";
import GameOver from "./components/GameOver.jsx";
const intialGameBoard = [
  [[null], [null], [null]],
  [[null], [null], [null]],
  [[null], [null], [null]],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function derivedGameBoard(gameTurns) {
  const gameBoard = [
    ...intialGameBoard.map((currentArray) => [...currentArray]),
  ];
  for (const turn of gameTurns) {
    console.log(turn);
    const { square, player } = turn;
    const { row, col } = square;
    console.log(row);
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNER_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = players[firstSquareSymbol];
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurns, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  // let winner = useMemo(() => {
  //   let winner;
  //   for (const combination of WINNER_COMBINATIONS) {
  //     const firstSquareSymbol =
  //       gameBoard[combination[0].row][combination[0].column];
  //     const secondSquareSymbol =
  //       gameBoard[combination[1].row][combination[1].column];
  //     const thirdSquareSymbol =
  //       gameBoard[combination[2].row][combination[2].column];
  //     if (
  //       firstSquareSymbol &&
  //       firstSquareSymbol === secondSquareSymbol &&
  //       firstSquareSymbol === thirdSquareSymbol
  //     ) {
  //       winner = firstSquareSymbol;
  //     }
  //     return winner;
  //   }
  // }, [gameTurns]);

  const draw = gameTurns.length === 9 && !winner;
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  function handleRestart() {
    setGameTurn([]);
    console.log("handle restart button is clicked ");
  }
  // const handleRestart = () => {
  //   setGameTurn([]);

  //   console.log("handle restart match button is clicked");
  // };
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player X"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player Y"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={() => handleRestart()} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
