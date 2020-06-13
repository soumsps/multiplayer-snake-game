const drawSnake = (gameBoard, snakeBody, snakeColor) => {
  if (!gameBoard) return;
  gameBoard.innerHTML = '';
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = segment[0];
    snakeElement.style.gridRowStart = segment[1];
    snakeElement.style.backgroundColor = snakeColor;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

const updateSnake = () => {};

const sendSnakeData = () => {};

export { drawSnake, updateSnake, sendSnakeData };
