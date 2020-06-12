import React, { memo } from 'react';

import './game-board.styles.css';

const GameBoard = ({ boardSize, boardBlockSize }) => {
  const boardStyle = {
    backgroundColor: '#f5f4f4',
    width: `${Math.round(boardSize.column * boardBlockSize)}px`,
    height: `${Math.round(boardSize.row * boardBlockSize)}px`,
    display: 'grid',
    gridTemplateRows: `repeat(${boardSize.row}, 1fr)`,
    gridTemplateColumns: `repeat(${boardSize.column}, 1fr)`,
    margin: 'auto',
    border: '1px solid #818181',
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

export default memo(GameBoard);
