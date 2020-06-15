import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';

import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import {
  drawSnake,
  moveSnake,
  getSnakeHead,
  growSnake,
  isSnakeDead,
  getNextSnakeHeadPosition,
} from '../../game-utility/snake';
import {
  drawFood,
  getRandomFoodPosition,
  isFoodEaten,
  removeOldFood,
} from '../../game-utility/food';
import {
  DEFAULT_BOARD_SIZE,
  DEFAULT_IS_SINGLE_PLAYER_MODE,
  DEFAULT_GAME_STATUS,
  DEFAULT_SNAKE_DATA,
} from '../../game-utility/constant';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState(DEFAULT_BOARD_SIZE);
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  const [isSinglePlayerMode] = useState(DEFAULT_IS_SINGLE_PLAYER_MODE);
  // possible modes: not-started, playing, paused, and finished
  const [gameStatus, setGameStatus] = useState(DEFAULT_GAME_STATUS);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef({ ...DEFAULT_SNAKE_DATA });
  const foodPositionRef = useRef(null);
  const gameBoardRef = useRef(null);
  const lastSnakeMoveTimeRef = useRef(0);

  const updateData = () => {
    if (isSnakeDead(snakeRef, boardSize)) {
      setGameStatus('finished');
      return;
    }

    moveSnake(getNextSnakeHeadPosition(snakeRef), snakeRef);

    if (
      isFoodEaten(getSnakeHead(snakeRef.current.body), foodPositionRef.current)
    ) {
      growSnake(snakeRef.current.body);
      removeOldFood(gameBoardRef.current);
      foodPositionRef.current = getRandomFoodPosition(boardSize);
      updateScore();
    }
  };

  const updateScore = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
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
    const secondsSinceLastSnakeMove =
      currentTime - lastSnakeMoveTimeRef.current;
    if (secondsSinceLastSnakeMove > snakeRef.current.speed) {
      lastSnakeMoveTimeRef.current = currentTime;
      if (gameStatus === 'playing') {
        updateData();
      }
    }
    drawData();
  };

  const onRestartButtonPress = (snakeRef) => {
    snakeRef.current = { ...DEFAULT_SNAKE_DATA };
    setScore(0);
  };

  useEffect(() => {
    foodPositionRef.current = getRandomFoodPosition(boardSize);
  }, [boardSize]);

  useEffect(() => {
    setBoardBlockSize(calculateBlockSize(browserWindowSize, boardSize));
  }, [browserWindowSize, boardSize]);

  useGameLoop(update);

  return (
    <div className=" wrapper">
      <header className="header">
        <h1 className="game-title">Snake Game</h1>
      </header>
      <div className="scoreboard">
        <div className="score-text">Score: {score}</div>

        <div className="score-text">High Score: {highScore}</div>
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
            onRestartButtonPress(snakeRef);
            setGameStatus('playing');
          }}
        >
          Restart
        </CustomButton>
      ) : (
        ''
      )}

      <GameController
        snakeRef={snakeRef}
        setGameStatus={setGameStatus}
        gameStatus={gameStatus}
        onRestartButtonPress={onRestartButtonPress}
      />
      <div className="instruction-text">
        Use <b>Enter</b> key to Start / Restart
        <br />
        Use <b>Space</b> key to Pause / Resume
        <br />
        Use <b>Arrow</b> or <b>W,A,S,D</b> keys to control snake.
      </div>
    </div>
  );
};

export default HomePage;
