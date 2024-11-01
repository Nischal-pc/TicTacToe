import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onNameChange }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const handlechange = (event) => {
    setPlayerName(event.target.value);
    onNameChange(symbol, playerName);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <>
            <span className="player-name">{playerName}</span>
            <span className="player-symbol">{symbol}</span>
          </>
        ) : (
          <input type="text" value={playerName} onChange={handlechange}></input>
        )}
        <button
          onClick={() => {
            console.log("button is clicked");
            setIsEditing((editing) => !editing);
          }}
        >
          {!isEditing ? "Edit" : "Save"}
        </button>
      </span>
    </li>
  );
};

export default Player;
