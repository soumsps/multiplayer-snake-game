import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState({
    row: 60,
    column: 80,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(null);
  const snakeSpeed = useRef(200);

  useEffect(() => {
    const extraColumnPadding = 4;
    if (browserWindowSize.width < 820)
      setBoardBlockSize(
        browserWindowSize.width / (boardSize.column + extraColumnPadding)
      );
    else if (browserWindowSize.width < 1024) setBoardBlockSize(10);
    else if (browserWindowSize.width > 1024) setBoardBlockSize(11);
  }, [browserWindowSize, boardSize]);

  const updateSnakePosition = () => {
    console.log('move snake');
  };

  const updateGameBoard = () => {
    console.log('frame');
  };

  useGameLoop({ snakeSpeed, updateSnakePosition, updateGameBoard });

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
      <CustomButton
        btnClass={'btn-game-control'}
        onClickCallback={() => {
          //   console.log(('button clicked', snakeSpeed.current));
          snakeSpeed.current = snakeSpeed.current - 16;
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </CustomButton>
      <GameController />
      <div className="instruction-text">
        Tip: Use arrow buttons to control snake.
      </div>
    </div>
  );
};

export default HomePage;
