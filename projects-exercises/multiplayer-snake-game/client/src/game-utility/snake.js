const drawSnake = (gameBoard, snakeBody, snakeColor) => {
  if (!gameBoard) return;
  // only remove class='snake' child nodes

  for (const node of gameBoard.childNodes) {
    if (node.classList.value === 'snake') {
      gameBoard.removeChild(node);
    }
  }

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
