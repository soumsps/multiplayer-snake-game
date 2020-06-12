import React, { useEffect } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './game-controller.styles.css';

const GameController = () => {
  const KeyCodes = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
  console.log('game controller');
  let snakeDirection = 'down';
  useEffect(() => {
    document.onkeydown = handleKeyDown;
  });

  const onLeftButtonPress = () => {
    if (snakeDirection === 'right') {
      return;
    }
    snakeDirection = 'left';
    console.log('left');
  };
  const onUpButtonPress = () => {
    if (snakeDirection === 'down') {
      return;
    }
    snakeDirection = 'up';
    console.log('up');
  };

  const onDownButtonPress = () => {
    if (snakeDirection === 'up') {
      return;
    }
    snakeDirection = 'down';
    console.log('down');
  };

  const onRightButtonPress = () => {
    if (snakeDirection === 'left') {
      return;
    }
    snakeDirection = 'right';
    console.log('right');
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KeyCodes.LEFT:
        onLeftButtonPress();
        break;
      case KeyCodes.UP:
        onUpButtonPress();
        break;
      case KeyCodes.RIGHT:
        onRightButtonPress();
        break;
      case KeyCodes.DOWN:
        onDownButtonPress();
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

export default GameController;
