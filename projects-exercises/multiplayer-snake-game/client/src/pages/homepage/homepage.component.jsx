import React, { useState } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import './homepage.styles.css';

const HomePage = () => {
  const [boardSize, setBoardSize] = useState({
    row: 40,
    column: 50,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(12);

  return (
    <div className=" wrapper">
      <header className="header">
        <h1 className="game-title">Snake Game</h1>
      </header>
      <div className="scoreboard">
        <div className="score-text">Score: 0</div>
        <div className="score-text">Food Eaten: 0</div>
        <div className="score-text">High Score: 0</div>
      </div>

      <GameBoard boardSize={boardSize} boardBlockSize={boardBlockSize} />

      <GameController />
      <div className="instruction-text">
        Tip: Use arrow buttons to control snake.
      </div>
    </div>
  );
};

export default HomePage;
