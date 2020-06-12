import React from 'react';

import './game-board.styles.css';

const GameBoard = ({ boardSize, boardBlockSize }) => {
  const boardStyle = {
    backgroundColor: '#f5f4f4',
    width: `${boardSize.column * boardBlockSize}px`,
    height: `${boardSize.row * boardBlockSize}px`,
    display: 'grid',
    gridTemplateRows: `repeat(${boardSize.row}, 1fr)`,
    gridTemplateColumns: `repeat(${boardSize.column}, 1fr)`,
  };

  return (
    <div style={boardStyle}>
      <div
        style={{ gridRowStart: 1, gridColumnStart: 1 }}
        className="snake"
      ></div>

      <div
        style={{ gridRowStart: 4, gridColumnStart: 5 }}
        className="snake"
      ></div>
    </div>
  );
};

export default GameBoard;
