import React, { useState, useCallback, useEffect, useRef } from 'react';
import GameController from '../../components/game-controller/game-controller.component';
import GameBoard from '../../components/game-board/game-board.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { useWindowSize } from '../../custom-hooks/use-window-size.hook';
import { useGameLoop } from '../../custom-hooks/use-game-loop.hook';
import { calculateBlockSize } from '../../game-utility/game-board';
import './homepage.styles.css';

const HomePage = () => {
  const browserWindowSize = useCallback(useWindowSize());
  const [boardSize] = useState({
    row: 60,
    column: 80,
  });
  const [boardBlockSize, setBoardBlockSize] = useState(null);

  //const [isSinglePlayerMode] = useState(true);
  //const [hasGameStarted, setHasGameStarted] = useState(false);
  //const [gameStatus, setGameStatus] = useState(null); // possible modes:  playing, paused, and finished
  const snakeRef = useRef({
    playerID: 'quft-yuytg',
    body: [
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 4, y: 7 },
    ],
    color: 'red',
    speed: 200,
  });
  const gameBoardRef = useRef(null);

  let lastSnakeMovementTime = 0;

  const updateData = () => {};

  const drawData = () => {
    draw(gameBoardRef.current, snakeRef.current.body);
  };

  const update = (currentTime) => {
    const secondsSinceLastSnakeMove = currentTime - lastSnakeMovementTime;
    if (secondsSinceLastSnakeMove > snakeRef.current.speed) {
      lastSnakeMovementTime = currentTime;
      //  console.log('move snake');
      updateData();
    }

    //console.log('frame');
    drawData();
  };

  useGameLoop(update);

  useEffect(() => {
    setBoardBlockSize(calculateBlockSize(browserWindowSize, boardSize));
  }, [browserWindowSize, boardSize]);

  function draw(gameBoard, snakeBody) {
    if (!gameBoard) return;
    gameBoard.innerHTML = '';
    snakeBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  //console.log(gameBoardRef.current);

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
      <GameController />
      <div className="instruction-text">
        Tip: Use arrow buttons to control snake.
      </div>
    </div>
  );
};

export default HomePage;
