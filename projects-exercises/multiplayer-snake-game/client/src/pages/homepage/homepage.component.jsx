import React, { useState, useCallback, useEffect } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState({
    row: 60,
    column: 80,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  useEffect(() => {
    const extraColumnPadding = 4;
    if (browserWindowSize.width < 820)
      setBoardBlockSize(
        browserWindowSize.width / (boardSize.column + extraColumnPadding)
      );
    else if (browserWindowSize.width < 1024) setBoardBlockSize(10);
    else if (browserWindowSize.width > 1024) setBoardBlockSize(11);
  }, [browserWindowSize, boardSize]);

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
