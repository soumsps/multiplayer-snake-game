import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import { drawSnake } from '../../game-utility/snake';
import { drawFood, getRandomFoodPosition } from '../../game-utility/food';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState({
    row: 30,
    column: 50,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  //const [isSinglePlayerMode] = useState(true);
  //const [hasGameStarted, setHasGameStarted] = useState(false);
  //const [gameStatus, setGameStatus] = useState(null); // possible modes:  playing, paused, and finished
  const foodPositionRef = useRef(null);
  const snakeRef = useRef({
    playerID: 'aaa-bbb',
    body: [
      [4, 5],
      [4, 6],
      [4, 7],
    ],
    color: 'red',
    speed: 200,
    direction: 'down',
  });
  const gameBoardRef = useRef(null);
  let lastSnakeMovementTime = 0;

  const updateData = () => {};

  const drawData = () => {
    drawSnake(
      gameBoardRef.current,
      snakeRef.current.body,
      snakeRef.current.color
    );
    drawFood(gameBoardRef.current, foodPositionRef.current);
  };

  // runs every 16.67ms
  const update = (currentTime) => {
    const secondsSinceLastSnakeMove = currentTime - lastSnakeMovementTime;
    if (secondsSinceLastSnakeMove > snakeRef.current.speed) {
      lastSnakeMovementTime = currentTime;
      updateData();
    }
    drawData();
  };

  useGameLoop(update);

  useEffect(() => {
    foodPositionRef.current = getRandomFoodPosition(boardSize);
  }, [boardSize]);

  useEffect(() => {
    setBoardBlockSize(calculateBlockSize(browserWindowSize, boardSize));
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

      <GameBoard
        boardSize={boardSize}
        boardBlockSize={boardBlockSize}
        ref={gameBoardRef}
      />
      <CustomButton btnClass={'btn-start'} onClickCallback={() => {}}>
        Start
      </CustomButton>
      <CustomButton btnClass={'btn'} onClickCallback={() => {}}>
        Pause
      </CustomButton>
      <CustomButton btnClass={'btn'} onClickCallback={() => {}}>
        Resume
      </CustomButton>
      <CustomButton btnClass={'btn-restart'} onClickCallback={() => {}}>
        Restart
      </CustomButton>
      <GameController snakeRef={snakeRef} />
      <div className="instruction-text">
        Tip: Use arrow buttons to control snake.
      </div>
    </div>
  );
};

export default HomePage;
