import React, { useEffect, memo } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './game-controller.styles.css';

const GameController = ({ snakeRef, gameStatus, setGameStatus }) => {
  const KeyCodes = {
    LEFT: 37,
    A: 65,
    UP: 38,
    W: 87,
    RIGHT: 39,
    D: 68,
    DOWN: 40,
    S: 83,
    ENTER: 13,
    SPACE: 32,
  };

  useEffect(() => {
    document.onkeydown = handleKeyDown;
  });

  const onLeftButtonPress = (snakeRef, gameStatus) => {
    if (snakeRef.current.direction === 'right' || gameStatus !== 'playing') {
      return;
    }
    snakeRef.current.direction = 'left';
  };

  const onUpButtonPress = (snakeRef, gameStatus) => {
    if (snakeRef.current.direction === 'down' || gameStatus !== 'playing') {
      return;
    }
    snakeRef.current.direction = 'up';
  };

  const onDownButtonPress = (snakeRef, gameStatus) => {
    if (snakeRef.current.direction === 'up' || gameStatus !== 'playing') {
      return;
    }
    snakeRef.current.direction = 'down';
  };

  const onRightButtonPress = (snakeRef, gameStatus) => {
    if (snakeRef.current.direction === 'left' || gameStatus !== 'playing') {
      return;
    }
    snakeRef.current.direction = 'right';
  };

  const onSpaceButtonPress = (gameStatus, setGameStatus) => {
    if (gameStatus === 'playing') {
      setGameStatus('paused');
    } else if (gameStatus === 'paused') {
      setGameStatus('playing');
    }
  };

  const onEnterButtonPress = (gameStatus, setGameStatus) => {
    if (gameStatus !== 'playing') {
      setGameStatus('playing');
    }
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KeyCodes.LEFT:
        onLeftButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.A:
        onLeftButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.UP:
        onUpButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.W:
        onUpButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.RIGHT:
        onRightButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.D:
        onRightButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.DOWN:
        onDownButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.S:
        onDownButtonPress(snakeRef, gameStatus);
        break;
      case KeyCodes.SPACE:
        onSpaceButtonPress(gameStatus, setGameStatus);
        break;
      case KeyCodes.ENTER:
        onEnterButtonPress(gameStatus, setGameStatus);
        break;
      default:
    }
  };

  return (
    <div className="mobile-controls">
      <CustomButton
        btnClass={'btn-game-control'}
        onClickCallback={onLeftButtonPress}
      >
        <i className="fas fa-arrow-left"></i>
      </CustomButton>
      <CustomButton
        btnClass={'btn-game-control'}
        onClickCallback={onUpButtonPress}
      >
        <i className="fas fa-arrow-up"></i>
      </CustomButton>
      <CustomButton
        btnClass={'btn-game-control'}
        onClickCallback={onDownButtonPress}
      >
        <i className="fas fa-arrow-down"></i>
      </CustomButton>
      <CustomButton
        btnClass={'btn-game-control'}
        onClickCallback={onRightButtonPress}
      >
        <i className="fas fa-arrow-right"></i>
      </CustomButton>
    </div>
  );
};

export default memo(GameController);
