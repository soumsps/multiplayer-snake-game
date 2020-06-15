import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';

import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import {
  drawSnake,
  updateSnake,
  getSnakeHead,
  growSnake,
  isSnakeDead,
} from '../../game-utility/snake';
import {
  drawFood,
  getRandomFoodPosition,
  isFoodEaten,
  removeOldFood,
} from '../../game-utility/food';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState({
    row: 30,
    column: 50,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  const [isSinglePlayerMode] = useState(true);
  const [gameStatus, setGameStatus] = useState('not-started'); // possible modes: not-started, playing, paused, and finished
  const foodPositionRef = useRef(null);
  const snakeRef = useRef({
    playerID: 'aaa-bbb',
    body: [
      [4, 7],
      [4, 6],
      [4, 5],
    ],
    color: 'red',
    speed: 160,
    direction: 'down',
  });
  const gameBoardRef = useRef(null);
  let lastSnakeMovementTime = 0;

  const updateData = () => {
    if (isSnakeDead(snakeRef, boardSize)) {
      console.log('snake dead');
    }

    updateSnake(snakeRef);

    if (
      isFoodEaten(getSnakeHead(snakeRef.current.body), foodPositionRef.current)
    ) {
      growSnake(snakeRef.current.body);
      removeOldFood(gameBoardRef.current);
      foodPositionRef.current = getRandomFoodPosition(boardSize);
    }
  };

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
      if (gameStatus === 'playing') {
        updateData();
      }
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

        <div className="score-text">High Score: 0</div>
      </div>

      <GameBoard
        boardSize={boardSize}
        boardBlockSize={boardBlockSize}
        ref={gameBoardRef}
      ></GameBoard>

      {gameStatus === 'not-started' ? (
        <CustomButton
          btnClass={'btn-start'}
          onClickCallback={() => {
            setGameStatus('playing');
          }}
        >
          Start
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'playing' ? (
        <CustomButton
          btnClass={'btn-pause'}
          onClickCallback={() => {
            setGameStatus('paused');
          }}
        >
          Pause
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'paused' ? (
        <CustomButton
          btnClass={'btn-resume'}
          onClickCallback={() => {
            setGameStatus('playing');
          }}
        >
          Resume
        </CustomButton>
      ) : (
        ''
      )}

      {gameStatus === 'finished' ? (
        <CustomButton
          btnClass={'btn-restart'}
          onClickCallback={() => {
            setGameStatus('playing');
          }}
        >
          Restart
        </CustomButton>
      ) : (
        ''
      )}

      <GameController snakeRef={snakeRef} />
      <div className="instruction-text">
        Enter button to Start / Restart
        <br />
        Space button to Pause / Resume
        <br />
        Use arrow buttons to control snake.
      </div>
    </div>
  );
};

export default HomePage;
